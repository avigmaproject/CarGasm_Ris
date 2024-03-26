/**
 * @format
 */

import { AppRegistry, StyleSheet } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import store from "./app/redux/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { firebase } from "@react-native-firebase/dynamic-links";
import PushNotification, { Importance } from "react-native-push-notification";
import { NOTIFICATION_CHANNEL } from "./app/utils/constant";

const firebaseConfig = {
  apiKey: "AIzaSyAnkUzE5cLVFFnTswdjuk_nezyQcNTL3hE",
  authDomain: "cargasm-1889e.firebaseapp.com",
  databaseURL: "https://cargasm-1889e.firebaseio.com",
  projectId: "cargasm-1889e",
  messagingSenderId: "",
  storageBucket: "cargasm-1889e.appspot.com",
  appId: "1:278711631399:android:8aaf50b6119f839ca89802",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

PushNotification.createChannel({
  channelId: NOTIFICATION_CHANNEL, // (required)
  channelName: "Default Channel", // (required)
  channelDescription:
    "This is the default notification channel of Sellgadi Seller App", // (optional) default: undefined.
  playSound: true, // (optional) default: true
  soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
  importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
  vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.import { NOTIFICATION_CHANNEL } from './constants';
});

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: console.log,
  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    // const { message, title, userInteraction, foreground, data } = notification;
    const { click_action } = notification.data;

    // triggerLocalNotification({
    //   title,
    //   message,
    //   id,
    // });

    console.log("notification.data;", notification.data);

    PushNotification.removeAllDeliveredNotifications();
  },
  popInitialNotification: true,
});

function Main() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={styles.container}>
        <App />
      </GestureHandlerRootView>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);

const styles = StyleSheet.create({
  container: { flex: 1 },
});
