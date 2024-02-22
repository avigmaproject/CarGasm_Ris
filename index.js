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
