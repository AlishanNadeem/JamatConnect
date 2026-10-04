import notifee, { AndroidImportance } from '@notifee/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  getMessaging,
  getToken,
  onMessage,
  onTokenRefresh,
  registerDeviceForRemoteMessages,
  isDeviceRegisteredForRemoteMessages,
} from '@react-native-firebase/messaging'
import { Platform } from 'react-native'
import { requestNotifications, RESULTS } from 'react-native-permissions'
import colors from '../helpers/colors'

const FCM_TOKEN_KEY = '@jamatconnect/fcm_token'
export const DEFAULT_CHANNEL_ID = 'jamatconnect_default'

const getMessagingInstance = () => getMessaging()

const requestNotificationPermission = async () => {

  const { status } = await requestNotifications(['alert', 'sound', 'badge'])
  return status === RESULTS.GRANTED || status === RESULTS.LIMITED
  
}

const ensureDeviceRegistered = async () => {

  const messaging = getMessagingInstance()

  if (Platform.OS === 'ios' && !isDeviceRegisteredForRemoteMessages(messaging)) {
    await registerDeviceForRemoteMessages(messaging)
  }

}

export const ensureNotificationChannel = async () => {

  if (Platform.OS !== 'android') return DEFAULT_CHANNEL_ID

  await notifee.createChannel({
    id: DEFAULT_CHANNEL_ID,
    name: 'General',
    importance: AndroidImportance.HIGH,
    sound: 'default',
  })

  return DEFAULT_CHANNEL_ID

}

export const displayLocalNotification = async (remoteMessage) => {

  const title =
    remoteMessage?.notification?.title ||
    remoteMessage?.data?.title ||
    'Jamat Connect'

  const body =
    remoteMessage?.notification?.body ||
    remoteMessage?.data?.body ||
    ''

  if (!title && !body) return

  const channel_id = await ensureNotificationChannel()

  await notifee.displayNotification({
    title,
    body,
    data: remoteMessage?.data || {},
    android: {
      channelId: channel_id,
      pressAction: { id: 'default' },
      smallIcon: 'ic_launcher',
      color: colors.primary,
      importance: AndroidImportance.HIGH,
    },
    ios: {
      sound: 'default',
    },
  })
}

export const getFcmToken = async () => {
  try {

    const permitted = await requestNotificationPermission()

    if (!permitted) {
      console.log('[FCM] Notification permission not granted')
      return null
    }

    await ensureDeviceRegistered()
    await ensureNotificationChannel()

    const messaging = getMessagingInstance()
    const token = await getToken(messaging)

    if (token) {
      await AsyncStorage.setItem(FCM_TOKEN_KEY, token)
      console.log('[FCM] Token:', token)
    }

    return token

  } catch (error) {
    console.log('[FCM] Failed to get token:', error?.message || error)
    return null
  }
}

export const getStoredFcmToken = () => AsyncStorage.getItem(FCM_TOKEN_KEY)

export const clearStoredFcmToken = () => AsyncStorage.removeItem(FCM_TOKEN_KEY)

export const subscribeToForegroundMessages = (onNotification) => {
  const messaging = getMessagingInstance()

  return onMessage(messaging, async (remoteMessage) => {
    console.log('[FCM] Foreground message:', remoteMessage)
    await displayLocalNotification(remoteMessage)
    onNotification?.(remoteMessage)
  })
}

export const subscribeToTokenRefresh = (onRefresh) => {
  const messaging = getMessagingInstance()

  return onTokenRefresh(messaging, async (token) => {
    await AsyncStorage.setItem(FCM_TOKEN_KEY, token)
    console.log('[FCM] Token refreshed:', token)
    onRefresh?.(token)
  })
}

export const initPushNotifications = async () => {
  const token = await getFcmToken()
  return token
}
