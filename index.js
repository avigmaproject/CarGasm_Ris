/**
 * @format
 */

import { AppRegistry, StyleSheet } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { Provider } from "react-redux";
import store from "./app/redux/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
