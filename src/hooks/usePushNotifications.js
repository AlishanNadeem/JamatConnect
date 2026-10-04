import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRegisterFcmTokenMutation } from '../redux/apis/User'
import { selectIsAuthenticated } from '../redux/selectors'
import {
  initPushNotifications,
  subscribeToForegroundMessages,
  subscribeToTokenRefresh,
} from '../services/notifications'

const usePushNotifications = () => {
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

    const setup = async () => {
      const token = await initPushNotifications()
      await syncToken(token)

      unsubscribe_message = subscribeToForegroundMessages()
      unsubscribe_token = subscribeToTokenRefresh((refreshed_token) => {
        syncToken(refreshed_token)
      })
    }

    setup()

    return () => {
      unsubscribe_message?.()
      unsubscribe_token?.()
    }
  }, [is_authenticated, registerFcmToken])
}

export default usePushNotifications
