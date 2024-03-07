import { StyleSheet, Platform } from "react-native";
import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DetailsPage from "../views/addProductPages/DetailsPage";
import Categories from "../views/addProductPages/Categories";
import Payment from "../views/addProductPages/Payment";
import UploadImage from "../views/addProductPages/UploadImage";
import { useDispatch } from "react-redux";
import { onGlobalChange } from "../redux/ducks/global";
import Box from "../components/Box";
import CustomText from "../components/CustomText";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../utils/color";
import {
  RouteProp,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
const footerTitles = [
  { id: "DetailsPage", name: "Details" },
  { id: "Categories", name: "Categories" },
  { id: "UploadImage", name: "Upload image" },
  { id: "Payment", name: "Payment" },
];

interface ProductTabNavigationProps {
  route: RouteProp<Record<string, object | undefined>, string>;
}

export default function ProductTabNavigation({
  route,
}: ProductTabNavigationProps) {
  const Tab = createMaterialTopTabNavigator<ProductsTabsParamList>();
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(onGlobalChange({ showBottomTabs: true }));
  }, []);

  const getActiveTab = (
    route: RouteProp<Record<string, object | undefined>, string>
  ) => {
    return getFocusedRouteNameFromRoute(route) || "DetailsPage";
  };

  const activeTab = getActiveTab(route);

  return (
    <Box style={{ flex: 1 }}>
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
      <Box style={styles.footer}>
        {footerTitles.map((el, index) => {
          const isActive = activeTab === el.id;
          return (
            <Box
              key={index.toString()}
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
            >
              <CustomText
                fontFamily={isActive ? "Inter-SemiBold" : "Inter-Regular"}
                fontSize={14}
                lineHeight={17}
                color={isActive ? colors.primary : colors.appblack}
              >
                {el.name}
              </CustomText>
              {index !== 3 && (
                <Icon
                  name="arrow-right-thin"
                  size={20}
                  color={colors.appblack}
                  style={{ marginLeft: Platform.OS === "ios" ? 2 : 5 }}
                />
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#E6E4E2",
    padding: Platform.OS === "android" ? 20 : 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
