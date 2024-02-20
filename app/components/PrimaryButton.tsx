import { Image, Pressable, StyleSheet } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import { pixelSizeHorizontal, pixelSizeVertical } from "../utils/responsive";
import colors from "../utils/color";
import { PrimaryButtonProps } from "../types/propTypes";

export default function PrimaryButton({
  label,
  onPress,
  buttonStyle,
  labelStyle,
  varient = "Primary",
  disabled = false,
}: PrimaryButtonProps) {
  return (
    <Pressable
      style={[
        styles.buttonContainer,
        varient === "Secondary" && styles.buttonSecondary,
        varient === "HotDeal" && styles.hotDealButton,
        disabled && styles.disbaled,
        buttonStyle,
      ]}
      disabled={disabled}
      onPress={onPress}
    >
      {varient === "HotDeal" && (
        <Image
          source={require("../assets/images/Welcome/Fire.png")}
          style={{ height: 20, width: 20, marginRight: 10 }}
        />
      )}
      <CustomText
        fontSize={18}
        color={
          varient === "Secondary"
            ? colors.primary
            : varient === "HotDeal"
            ? colors.orange
            : colors.secondary
        }
        fontFamily="Poppins-SemiBold"
        lineHeight={27}
        style={[styles.label, labelStyle]}
      >
        {label}
      </CustomText>
      {varient === "HotDeal" && (
        <Image
          source={require("../assets/images/Welcome/Fire.png")}
          style={{ height: 20, width: 20, marginLeft: 10 }}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.primary,
    paddingHorizontal: pixelSizeHorizontal(22),
    paddingVertical: pixelSizeVertical(10),
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    // textTransform: "uppercase",
  },
  buttonSecondary: {
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  disbaled: {
    backgroundColor: "#ACACAC",
  },
  hotDealButton: {
    backgroundColor: colors.lightOrange,
    borderWidth: 1,
    borderColor: colors.orange,
    flexDirection: "row",
  },
});
