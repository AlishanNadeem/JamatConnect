import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { baseApi } from '../redux/apis/Base'
import { useRegisterFcmTokenMutation } from '../redux/apis/User'
import { selectIsAuthenticated } from '../redux/selectors'
import {
  initPushNotifications,
  subscribeToForegroundMessages,
  subscribeToTokenRefresh,
} from '../services/notifications'

const usePushNotifications = () => {
  
  const dispatch = useDispatch()
  const is_authenticated = useSelector(selectIsAuthenticated)
  const [registerFcmToken] = useRegisterFcmTokenMutation()

  useEffect(() => {
    let unsubscribe_message
    let unsubscribe_token

    const syncToken = async (token) => {
      if (!token || !is_authenticated) return

      try {
        await registerFcmToken({ fcm_token: token }).unwrap()
      } catch (error) {
        console.log('[FCM] Failed to register token with backend:', error?.data?.message || error)
      }
    }

    const refreshNotificationQueries = () => {
      dispatch(baseApi.util.invalidateTags(['Notifications', 'NotificationUnreadCount']))
    }

    const setup = async () => {
      const token = await initPushNotifications()
      await syncToken(token)

      unsubscribe_message = subscribeToForegroundMessages(() => {
        refreshNotificationQueries()
      })

      unsubscribe_token = subscribeToTokenRefresh((refreshed_token) => {
        syncToken(refreshed_token)
      })
    }

    setup()

    return () => {
      unsubscribe_message?.()
      unsubscribe_token?.()
    }
  }, [dispatch, is_authenticated, registerFcmToken])
}

export default usePushNotifications
