import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../../views/profile/Profile";

const ProfileStackNav = createStackNavigator();

export default function ProfileStack() {
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
