import React, { useState } from "react";
import Box from "../../../components/Box";
import CustomText from "../../../components/CustomText";
import PrimaryButton from "../../../components/PrimaryButton";
import TextBox from "../../../components/TextBox";
import { useSheetRouter } from "react-native-actions-sheet";
import OtpInputs from "react-native-otp-inputs";
import { Platform, StyleSheet } from "react-native";

export default function OtpPage() {
  const [code, setCode] = useState("");
  const router = useSheetRouter("sheet-with-router");
  //   const params = useSheetRouteParams("sheet-with-router", "route-b");

  function onContinue() {
    router?.navigate("route-c");
  }

  return (
    <Box ph={20} pv={10}>
      <Box mt={30}>
        <CustomText
          fontSize={24}
          lineHeight={29}
          color={"#333B4B"}
          fontFamily="Inter-Bold"
        >
          Enter 4 Digits Code
        </CustomText>
        <CustomText
          fontSize={14}
          lineHeight={23}
          color={"#677294"}
          fontFamily="Inter-Regular"
          style={{ marginTop: 10 }}
        >
          Enter the 4 digits code that you received on your email.
        </CustomText>
      </Box>

      <Box mv={40}>
        <OtpInputs
          handleChange={(code) => console.log(code)}
          numberOfInputs={4}
          autofillFromClipboard={false}
          keyboardType="phone-pad"
          inputContainerStyles={{
            borderWidth: 1,
            height: 50,
            width: 50,
            marginTop: 20,
            borderColor: colors.borderColor,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
          }}
          inputStyles={{
            fontSize: 26,
            fontFamily: "Inter-Bold",
            top: Platform.OS === "android" ? 2 : 0,
            left: Platform.OS === "android" ? 2 : 0,
            lineHeight: 30,
          }}
        />
      </Box>
      <Box mv={30} mb={30} ph={25}>
        <PrimaryButton label="Continue" onPress={onContinue} />
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    height: 50,
    width: 50,
    marginTop: 20,
  },
});
