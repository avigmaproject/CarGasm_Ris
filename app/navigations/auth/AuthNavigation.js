import * as React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Login from "../../views/auth/login/Login";
// import VerifyEmail from "../../screens/Home/VerifyEmail"
// import Forgotpassword from "../../screens/auth/Forgotpassword/Forgotpassword"
// import Resetpassword from "../../screens/auth/Resetpassword/Resetpassword"
import SignUp from "../../views/auth/signup/SignUp";
import Welcome from "../../views/welcome/Welcome";
const Stack = createStackNavigator();

export default function AuthNavigation() {
  const forFade = ({ current, closing }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });
  return (
    <Stack.Navigator
      screenOptions={{ cardStyleInterpolator: forFade, headerShown: false }}
    >
      {/* <Stack.Screen name="Welcome" component={Welcome} /> */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      {/* <Stack.Screen name="Forgotpassword" component={Forgotpassword} />
            <Stack.Screen name="Resetpassword" component={Resetpassword} /> */}
    </Stack.Navigator>
  );
}
