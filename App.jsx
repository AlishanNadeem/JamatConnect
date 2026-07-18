import { NavigationContainer } from '@react-navigation/native'
import { useEffect } from 'react'
import { AppState, Linking, Platform, StatusBar, StyleSheet, View } from 'react-native'
import BootSplash from 'react-native-bootsplash'
import { getVersion } from 'react-native-device-info'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { Provider, useSelector } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Text from './src/components/Text'
import { DEV_MODE } from './src/config/env'
import { ModalProvider, useModal } from './src/contexts/ModalContext'
import colors from './src/helpers/colors'
import { GLOBAL_HORIZONTAL_PADDING, heightPixel, SCREEN_WIDTH, widthPixel } from './src/helpers/metrics'
import { navigation_ref } from './src/helpers/navigation'
import useToggle from './src/hooks/useToggle'
import MainStackNavigator from './src/navigation/MainStackNavigator'
import { useGetVersionQuery } from './src/redux/apis/General'
import { selectAppConfig } from './src/redux/selectors'
import { persistor, store } from './src/redux/store'

const toast_config = {
  error: (props) => (
    <View style={[styles.toast_container, styles.error_bg]}>
      <Text size={15} weight='semibold'>{props.text1}</Text>
      <Text size={12}>{props.text2}</Text>
    </View>
  ),
};

const AppContent = () => {

  const { showInfoModal } = useModal()
  const { value: navigation_ready, toggle: toggleNavigationReady } = useToggle()
  const { isSuccess } = useGetVersionQuery()
  const app_config = useSelector(selectAppConfig)

  useEffect(() => {
    if (navigation_ready) {
      BootSplash.hide({ fade: true })
      // checkVersion()
    }
  }, [navigation_ready, isSuccess])

  useEffect(() => {

    const subscription = AppState.addEventListener(
      'change',
      next_app_state => {
        if (next_app_state === 'active') {
          checkVersion()
        }
      },
    )

    return () => subscription.remove()

  }, [])

  const checkVersion = () => {

    if (!DEV_MODE && app_config && app_config.lastest_app_version?.[Platform.OS] != getVersion()) {
      showInfoModal({
        title: app_config.message?.title || "",
        message: app_config.message?.body || "",
        button_text: app_config.message?.button_text || "Update",
        onConfirm: () => Linking.openURL(app_config.download_urls?.[Platform.OS] || "")
      })
    }

  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.container}>
        <NavigationContainer ref={navigation_ref} onReady={toggleNavigationReady}>
          <MainStackNavigator />
          <Toast
            config={toast_config}
            topOffset={60}
          />
        </NavigationContainer>
      </View>
    </SafeAreaProvider >
  )
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ModalProvider>
          <AppContent />
        </ModalProvider>
      </PersistGate>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toast_container: {
    width: SCREEN_WIDTH - (GLOBAL_HORIZONTAL_PADDING * 2),
    gap: heightPixel(4),
    paddingVertical: heightPixel(12),
    paddingHorizontal: widthPixel(12),
    borderRadius: widthPixel(8),
    justifyContent: 'center',
  },
  error_bg: {
    backgroundColor: colors.red,
  },
})

export default App
