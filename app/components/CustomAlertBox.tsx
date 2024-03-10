import { View, Text, StyleSheet, Dimensions, Platform } from "react-native";
import React from "react";
import Box from "./Box";
import CustomText from "./CustomText";
import { CustomAlertBoxProps } from "../types/propTypes";
import Modal from "react-native-modalbox";
import Icon from "react-native-vector-icons/AntDesign";
import colors from "../utils/color";
import PrimaryButton from "./PrimaryButton";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function CustomAlertBox({
  visible,
  onClose,
  title,
  buttonLabel1,
  buttonLabel2,
  onPressFirstButton,
  onPressSecondButton,
}: CustomAlertBoxProps) {
  return (
    <Modal
      style={styles.modal}
      isOpen={visible}
      onClosed={onClose}
      backdrop={true}
      backButtonClose={false}
      coverScreen
    >
      <Box>
        <Box style={styles.circle}>
          <Icon name="questioncircleo" size={20} color={colors.red} />
        </Box>
        <Box alignItems="center" mt={20}>
          <CustomText
            fontSize={16}
            lineHeight={22}
            color={colors.textColor}
            fontFamily="Inter-Medium"
          >
            {title}
          </CustomText>
        </Box>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          pv={15}
          ph={20}
        >
          <PrimaryButton
            label={buttonLabel1}
            varient="Alert"
            onPress={onPressFirstButton}
          />
          <PrimaryButton label={buttonLabel2} onPress={onPressSecondButton} />
        </Box>
      </Box>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    width: width * 0.8,
    height: Platform.OS === "android" ? height * 0.27 : height * 0.24,
    borderRadius: 8,
  },
  circle: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginTop: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignSelf: "center",
    backgroundColor: "rgba(255, 102, 102, 0.1)",
  },
});
