import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import CustomText from "./CustomText";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../utils/color";
import { Image } from "react-native";

export default function CustomHeader() {
  return (
    <LinearGradient
      colors={["rgba(9, 240, 185, 0.5)", "#4E6AFF"]}
      style={styles.container}
    >
      <Pressable style={styles.back}>
        <Icon name="chevron-left" size={30} color={colors.appblack} />
      </Pressable>
      <CustomText
        fontFamily="Inter-Bold"
        fontSize={22}
        lineHeight={27}
        color={colors.secondary}
      >
        Product Details
      </CustomText>
      <Pressable style={[styles.circle, { left: 20 }]}>
        <Image
          source={require("../assets/images/Arrow.png")}
          style={{ height: 22, width: 22, resizeMode: "contain" }}
        />
      </Pressable>
      <Pressable style={styles.circle}>
        <Icon name="heart-outline" color={colors.secondary} size={22} />
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingVertical: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  back: {
    backgroundColor: colors.secondary,
    borderRadius: 8,
  },
  circle: {
    padding: 8,
    backgroundColor: "rgba(80,152,239,0.5)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
