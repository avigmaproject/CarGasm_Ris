import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Profile from "../../views/profile/profiletab";

const ProfileStackNav = createStackNavigator();

export default function HomeStack() {
  return (
    <ProfileStackNav.Navigator>
      <ProfileStackNav.Screen
        component={Profile}
        options={() => {
          return {
            headerShown: false,
          };
        }}
        name="Profile"
      />
    </ProfileStackNav.Navigator>
  );
}
