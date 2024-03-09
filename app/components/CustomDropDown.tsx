/* eslint-disable react-native/no-inline-styles */
import { Picker } from "@react-native-picker/picker";
import React from "react";
import {
  ActionSheetIOS,
  Appearance,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomText from "./CustomText";
import Box from "./Box";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CustomDropDownProps } from "../types/propTypes";
import colors from "../utils/color";

export default function CustomDropDown({
  onValueChange,
  selectedValue,
  data,
  //   enabled = true,
  title,
  isMandatory = false,
  error,
  placeholder,
}: CustomDropDownProps) {
  function onOpenSheet() {
    console.log("called");

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", ...data.map((el) => el.label)],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
        userInterfaceStyle: Appearance.getColorScheme() || "light",
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          return;
        }
        onValueChange &&
          onValueChange(data[buttonIndex - 1].value, buttonIndex - 1);
      }
    );
  }

  return (
    <Box pv={"2%"}>
      <CustomText
        fontSize={14}
        lineHeight={28}
        fontFamily="Inter-Medium"
        color={"#111111"}
      >
        {title}
        {isMandatory && <Text style={{ color: "red" }}>*</Text>}
      </CustomText>
      <Box flexDirection="row" alignItems="center">
        <Box style={[styles.pickerContainer, error && styles.error]}>
          {Platform.OS === "ios" ? (
            <TouchableOpacity onPress={onOpenSheet} style={{ width: "100%" }}>
              <View style={styles.container}>
                <CustomText color={"#5D5D5D"}>
                  {selectedValue ? selectedValue : placeholder}
                </CustomText>
              </View>
            </TouchableOpacity>
          ) : (
            <Picker
              style={[styles.picker]}
              onValueChange={onValueChange}
              selectedValue={selectedValue}
              placeholder={placeholder}
            >
              {data.map((el, index) => {
                return (
                  <Picker.Item
                    style={[styles.item, { color: "#111111" }]}
                    key={index}
                    label={el.label}
                    value={el.value}
                    enabled={el.enabled === undefined ? true : el.enabled}
                  />
                );
              })}
            </Picker>
          )}
        </Box>
      </Box>
      {error && (
        <CustomText fontSize={14} color="#FF0000" style={{ marginTop: 2 }}>
          {error}
        </CustomText>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  picker: { width: "100%" },
  item: { fontSize: 14 },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.borderColor,
    marginTop: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondary,
    width: "100%",
  },
  upload: {
    paddingHorizontal: 10,
    width: "30%",
    left: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 2,
    top: 2,
  },
  error: {
    borderColor: "red",
    borderWidth: 1.5,
  },
});
