import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Home from "../../views/home/Home";

const HomeStackNav = createStackNavigator();

export default function HomeStack() {
  return (
    <HomeStackNav.Navigator>
      <HomeStackNav.Screen
        component={Home}
        options={() => {
          return {
            headerShown: false,
          };
        }}
        name="Home"
      />
    </HomeStackNav.Navigator>
  );
}
