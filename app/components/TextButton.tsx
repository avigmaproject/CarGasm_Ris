import React from "react";
import { StyleSheet, TextProps, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import CustomText from "./CustomText";
import colors from "../utils/color";
import { TextButtonProps } from "../types/propTypes";

export default function TextButton({
  label,
  onPress,
  containerStyles,
}: TextButtonProps & TextProps) {
  return (
    <View style={[styles.container, containerStyles]}>
      <TouchableOpacity onPress={onPress}>
        <CustomText
          fontSize={12}
          color={colors.primary}
          lineHeight={16}
          fontFamily="Inter-Bold"
        >
          {label}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  label: {
    // borderBottomWidth: 1,
    // borderColor: colors.primary,
    // textDecorationLine: "underline",
  },
});
