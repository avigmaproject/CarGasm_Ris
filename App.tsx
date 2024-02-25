import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "./app/views/welcome/Welcome";
import Login from "./app/views/auth/login/Login";
import SignUp from "./app/views/auth/signup/SignUp";
import Splash from "./app/views/splash/Splash";
import Intro from "./app/views/intro/Intro";
import { StyleSheet } from "react-native";
import GlobalContext from "./app/contexts/GlobalContext";
import Home from "./app/views/home/Home";
import Profile from "./app/views/profile/Profile";
import Subscription from "./app/views/subscription/Subscription";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [fromLogin, setFromLogin] = useState(false);
  const [globalUserName, setGlobalUserName] = useState("");
  const RootStack = createStackNavigator<RootStackParamList>();

  return (
    <GlobalContext.Provider
      value={{
        setAuthenticated,
        setFromLogin,
        globalUserName,
        setGlobalUserName,
      }}
    >
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          {!authenticated ? (
            <>
              <RootStack.Screen
                name="Splash"
                component={Splash}
                options={{ headerShown: false }}
              />
              <RootStack.Screen
                name="Intro"
                component={Intro}
                options={{ headerShown: false, gestureEnabled: false }}
              />
              <RootStack.Screen
                name="Welcome"
                component={Welcome}
                options={{ headerShown: false, gestureEnabled: false }}
              />
              <RootStack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <RootStack.Screen
                name="SignUp"
                component={SignUp}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              {!fromLogin && (
                <RootStack.Screen
                  name="Profile"
                  component={Profile}
                  options={{ headerShown: false }}
                />
              )}
              <RootStack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
              />
              <RootStack.Screen
                name="Subscription"
                component={Subscription}
                options={{ headerShown: false }}
              />
            </>
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </GlobalContext.Provider>
  );
};
export default App;

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative" },
});
