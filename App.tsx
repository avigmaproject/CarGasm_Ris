import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "./app/views/welcome/Welcome";
import Login from "./app/views/auth/login/Login";
import SignUp from "./app/views/auth/signup/SignUp";
import Splash from "./app/views/splash/Splash";
import Intro from "./app/views/intro/Intro";
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        {/* <Stack.Screen name="Forgotpassword" component={Forgotpassword} />
            <Stack.Screen name="Resetpassword" component={Resetpassword} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
