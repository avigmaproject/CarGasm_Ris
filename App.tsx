import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "./app/views/welcome/Welcome";
import Login from "./app/views/auth/login/Login";
import SignUp from "./app/views/auth/signup/SignUp";
import Splash from "./app/views/splash/Splash";
import Intro from "./app/views/intro/Intro";
import { StatusBar, StyleSheet, View } from "react-native";
import GlobalContext from "./app/contexts/GlobalContext";
import Home from "./app/views/home/Home";
import Subscription from "./app/views/subscription/Subscription";
import BottomNavigations from "./app/navigations/BottomNavigations";
import Details from "./app/views/details/Details";
import EditProfile from "./app/views/profile/EditProfile";
import Setting from "./app/views/settings/Setting";
import SellerProfile from "./app/views/home/SellerProfile";
import messaging, { firebase } from "@react-native-firebase/messaging";
import Chat from "./app/views/chat/Chat";
import { PERMISSIONS } from "react-native-permissions";
import PushNotification from "react-native-push-notification";
const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [fromLogin, setFromLogin] = useState(false);
  const [globalUserName, setGlobalUserName] = useState("");
  const RootStack = createStackNavigator<RootStackParamList>();

  const getFirebaseToken = async () => {
    // Get the token
    const fcmToken = await firebase.messaging().getToken();
    console.log("token=>>>>>", fcmToken);
  };

  useEffect(() => {
    getFirebaseToken();
  }, [messaging]);

  useEffect(() => {
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });
  }, []);

  PushNotification.configure({
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
    },
    // requestPermissions: Platform.OS === 'ios'
  });

  // const MyStatusBar = ({ backgroundColor, ...props }) => (
  //   <View style={[styles.statusBar, { backgroundColor }]}>
  //     <SafeAreaView>
  //       <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  //     </SafeAreaView>
  //   </View>
  // );

  return (
    <GlobalContext.Provider
      value={{
        setAuthenticated,
        setFromLogin,
        globalUserName,
        setGlobalUserName,
      }}
    >
      {/* <View style={styles.container}> */}
      {/* <MyStatusBar backgroundColor="#FFFEF8" barStyle="light-content" /> */}
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
                name="Home"
                component={Home}
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
                <>
                  <RootStack.Screen
                    name="EditProfile"
                    component={EditProfile}
                    options={{ headerShown: false }}
                  />
                  <RootStack.Screen
                    name="Subscription"
                    component={Subscription}
                    options={{ headerShown: false }}
                  />
                </>
              )}
              <RootStack.Screen
                options={{ headerShown: false }}
                name="BottomTabNavigations"
                component={BottomNavigations}
              />
              <RootStack.Screen
                options={{ headerShown: false }}
                name="Details"
                component={Details}
              />
              <RootStack.Screen
                options={{ headerShown: false }}
                name="Setting"
                component={Setting}
              />
              <RootStack.Screen
                options={{ headerShown: false }}
                name="SellerProfile"
                component={SellerProfile}
              />
              <RootStack.Screen
                options={{ headerShown: false }}
                name="Chat"
                component={Chat}
              />
            </>
          )}
        </RootStack.Navigator>
      </NavigationContainer>
      {/* </View> */}
    </GlobalContext.Provider>
  );
};
export default App;

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative" },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});
