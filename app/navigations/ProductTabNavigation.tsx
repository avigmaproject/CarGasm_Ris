import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DetailsPage from "../views/addProductPages/DetailsPage";
import Categories from "../views/addProductPages/Categories";
import Payment from "../views/addProductPages/Payment";
import UploadImage from "../views/addProductPages/UploadImage";
import { useDispatch } from "react-redux";
import { onGlobalChange } from "../redux/ducks/global";

export default function ProductTabNavigation() {
  const Tab = createMaterialTopTabNavigator<ProductsTabsParamList>();
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(onGlobalChange({ showBottomTabs: true }));
  }, []);

  return (
    <Tab.Navigator
      style={{ backgroundColor: "transparent" }}
      screenOptions={{
        swipeEnabled: false,
        lazy: true,
        animationEnabled: true,
        tabBarStyle: { height: 0 },
      }}
      backBehavior="order"
    >
      <Tab.Screen name="DetailsPage" component={DetailsPage} />
      <Tab.Screen name="Categories" component={Categories} />
      <Tab.Screen name="UploadImage" component={UploadImage} />
      <Tab.Screen name="Payment" component={Payment} />
    </Tab.Navigator>
  );
}
