import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
} from "react-native";
import React from "react";
import colors from "../utils/color";
import CustomText from "./CustomText";
import { TextInProps } from "../types/propTypes";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function Input(props: TextInputProps & TextInProps) {
  const { label, input, error } = props;
  return (
    <View>
      <CustomText
        color={colors.appblack}
        fontSize={14}
        lineHeight={17}
        fontFamily="Inter-Medium"
      >
        {label}
      </CustomText>
      <TextInput
        {...props}
        style={[styles.inputStyle, input, error && styles.error]}
      />
      {error && (
        <CustomText color="red" fontSize={14} style={{ marginTop: 2 }}>
          {error}
        </CustomText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    borderWidth: 1,
    height: 50,
    backgroundColor: colors.secondary,
    borderRadius: 8,
    borderColor: colors.borderColor,
    marginTop: 10,
    paddingHorizontal: wp("5%"),
    color: "#333B4B",
    fontFamily: "Inter-Medium",
    fontSize: 16,
  },
  error: {
    borderColor: "red",
    borderWidth: 1.5,
  },
});
