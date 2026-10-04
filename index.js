/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import {
  getMessaging,
  setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';
import App from './App';
import { name as appName } from './app.json';
import { displayLocalNotification } from './src/services/notifications';

const messaging = getMessaging();

setBackgroundMessageHandler(messaging, async (remoteMessage) => {
  console.log('[FCM] Background message:', remoteMessage);
  // System already shows FCM notification payloads; display for data-only messages.
  if (!remoteMessage?.notification) {
    await displayLocalNotification(remoteMessage);
  }
});

AppRegistry.registerComponent(appName, () => App);
