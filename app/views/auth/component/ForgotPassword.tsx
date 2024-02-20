import React, { useState } from "react";
import Box from "../../../components/Box";
import CustomText from "../../../components/CustomText";
import TextBox from "../../../components/TextBox";
import PrimaryButton from "../../../components/PrimaryButton";
import { RouteScreenProps, useSheetRouter } from "react-native-actions-sheet";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const router = useSheetRouter();

  function onContinue() {
    router?.navigate("route-b");
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
          Forgot password
        </CustomText>
        <CustomText
          fontSize={14}
          lineHeight={23}
          color={"#677294"}
          fontFamily="Inter-Regular"
          style={{ marginTop: 10 }}
        >
          Enter your email for the verification proccesss, we will send 4 digits
          code to your email.
        </CustomText>
      </Box>

      <Box mt={20}>
        <TextBox
          onChangeText={setEmail}
          label={"Email address*"}
          value={email}
          keyboardType={"email-address"}
        />
      </Box>
      <Box mv={30} mb={30} ph={25}>
        <PrimaryButton label="Continue" onPress={onContinue} />
      </Box>
    </Box>
  );
}
