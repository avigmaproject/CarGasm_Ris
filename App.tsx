import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "./app/views/welcome/Welcome";
import Login from "./app/views/auth/login/Login";
import SignUp from "./app/views/auth/signup/SignUp";
import Splash from "./app/views/splash/Splash";
import Intro from "./app/views/intro/Intro";
import { SafeAreaView, StyleSheet } from "react-native";
import GlobalContext from "./app/contexts/GlobalContext";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const RootStack = createStackNavigator<RootStackParamList>();

  console.log("authenticated", authenticated);

  return (
    <GlobalContext.Provider
      value={{
        setAuthenticated,
      }}
    >
      {/* <SafeAreaView style={styles.container}> */}
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Splash" component={Splash} />
          <RootStack.Screen name="Intro" component={Intro} />
          <RootStack.Screen name="Welcome" component={Welcome} />
          <RootStack.Screen name="Login" component={Login} />
          <RootStack.Screen name="SignUp" component={SignUp} />
        </RootStack.Navigator>
      </NavigationContainer>
      {/* </SafeAreaView> */}
    </GlobalContext.Provider>
  );
};
export default App;

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative" },
});
