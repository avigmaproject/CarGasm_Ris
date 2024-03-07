import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import productdetail from "../../views/Addpost/productdetail"
import categories from "../../views/Addpost/categories"

const AddVehicleStackNav = createStackNavigator()

export default function AddVehicleStack() {
  return (
    <AddVehicleStackNav.Navigator>
      <AddVehicleStackNav.Screen
        component={productdetail}
        options={() => {
          return {
            headerShown: false
          }
        }}
        name="productdetail"
      />
      <AddVehicleStackNav.Screen
        component={categories}
        options={() => {
          return {
            headerShown: false
          }
        }}
        name="categories"
      />
    </AddVehicleStackNav.Navigator>
  )
}
