import { View, Text } from "react-native";
import React from "react";
import Profile from "../../views/profile/Profile"
import { createStackNavigator } from "@react-navigation/stack";

export default function ProfileStack() {
const ProfileStackNav = createStackNavigator();
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
