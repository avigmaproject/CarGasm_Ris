import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProductTabNavigation from "../ProductTabNavigation";

const ProductStack = createStackNavigator();

export default function AddVehicleStack() {
  return (
    <ProductStack.Navigator>
      <ProductStack.Screen
        component={ProductTabNavigation}
        options={() => {
          return {
            headerShown: false,
          };
        }}
        name="ProductTabNavigation"
      />
    </ProductStack.Navigator>
  );
}
