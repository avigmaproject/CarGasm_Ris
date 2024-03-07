import { View, StyleSheet, Platform } from "react-native";
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import HomeStack from "./stacks/HomeStack";
import MessageStack from "./stacks/MessageStack";
import AddVehicleStack from "./stacks/AddVehicleStack";
import ProfileStack from "./stacks/ProfileStack";
import SubscriptionStack from "./stacks/SubscriptionStack";
import colors from "../utils/color";
import { pixelSizeHorizontal, pixelSizeVertical } from "../utils/responsive";
import { useAppSelector } from "../utils/hooks";

const Tab = createBottomTabNavigator<BottomStackParamList>();

export default function BottomNavigations() {
  const selectGlobalState = useAppSelector((state) => state.global);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderWidth: 1,
          backgroundColor: colors.tabColor,
          position: "absolute",
          bottom: Platform.OS === "android" ? 5 : 20,
          height: 70,
          width: "95%",
          marginLeft: 10,
          borderRadius: 10,
          padding: Platform.OS === "android" ? 0 : 30,
          display: !selectGlobalState.showBottomTabs ? "flex" : "none",
        },
      }}
    >
      <Tab.Screen
        listeners={{
          tabPress: selectGlobalState.isFormEdited
            ? (e) => {
                if (selectGlobalState.isFormEdited) {
                  e.preventDefault();
                }
              }
            : undefined,
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused && styles.active}>
              <Image
                source={require("../assets/images/BottomIcon/Home.png")}
                style={styles.image}
              />
            </View>
          ),
        }}
        name="HomeStack"
        component={HomeStack}
      />
      <Tab.Screen
        listeners={{
          tabPress: selectGlobalState.isFormEdited
            ? (e) => {
                if (selectGlobalState.isFormEdited) {
                  e.preventDefault();
                }
              }
            : undefined,
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused && styles.active}>
              <Image
                source={require("../assets/images/BottomIcon/Message.png")}
                style={styles.image}
              />
            </View>
          ),
        }}
        name="MessageStack"
        component={MessageStack}
      />

      <Tab.Screen
        listeners={{
          tabPress: selectGlobalState.isFormEdited
            ? (e) => {
                if (selectGlobalState.isFormEdited) {
                  e.preventDefault();
                }
              }
            : undefined,
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused && styles.active}>
              <Image
                source={require("../assets/images/BottomIcon/AddVehi.png")}
                style={styles.image}
              />
            </View>
          ),
        }}
        name="AddVehicleStack"
        component={AddVehicleStack}
      />
      <Tab.Screen
        listeners={{
          tabPress: selectGlobalState.isFormEdited
            ? (e) => {
                if (selectGlobalState.isFormEdited) {
                  e.preventDefault();
                }
              }
            : undefined,
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused && styles.active}>
              <Image
                source={require("../assets/images/BottomIcon/Profile.png")}
                style={styles.image}
              />
            </View>
          ),
        }}
        name="ProfileStack"
        component={ProfileStack}
      />
      <Tab.Screen
        listeners={{
          tabPress: selectGlobalState.isFormEdited
            ? (e) => {
                if (selectGlobalState.isFormEdited) {
                  e.preventDefault();
                }
              }
            : undefined,
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused && styles.active}>
              <Image
                source={require("../assets/images/BottomIcon/Subscription.png")}
                style={styles.image}
              />
            </View>
          ),
        }}
        name="SubscriptionStack"
        component={SubscriptionStack}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  active: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 30,
  },
  image: {
    height: pixelSizeVertical(25),
    width: pixelSizeHorizontal(25),
    resizeMode: "contain",
  },
});
