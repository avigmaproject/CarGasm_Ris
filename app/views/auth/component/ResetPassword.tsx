import { View, Text } from "react-native";
import React, { useState } from "react";
import Box from "../../../components/Box";
import CustomText from "../../../components/CustomText";
import PrimaryButton from "../../../components/PrimaryButton";
import TextBox from "../../../components/TextBox";
import { TextInput } from "react-native-paper";
import { SheetManager, useSheetRouter } from "react-native-actions-sheet";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confPassword, setConPassword] = useState("");
  const [secureTextEntry, setsecureTextEntry] = useState(true);
  const router = useSheetRouter("sheet-with-router");

  const handleSecureEntry = () => {
    setsecureTextEntry(!secureTextEntry);
  };

  const onHideSheets = () => {
    SheetManager.hide("reset-password");
  };

  return (
    <Box ph={20} pv={10}>
      <Box mt={30}>
        <CustomText
          fontSize={24}
          lineHeight={29}
          color={"#333B4B"}
          fontFamily="Inter-Bold"
        >
          Reset Password
        </CustomText>
        <CustomText
          fontSize={14}
          lineHeight={23}
          color={"#677294"}
          fontFamily="Inter-Regular"
          style={{ marginTop: 10 }}
        >
          Set the new password for your account so you can login and access all
          the features.
        </CustomText>
      </Box>

      <Box mt={20}>
        <TextBox
          onChangeText={setPassword}
          label={"New password"}
          value={password}
          secureTextEntry={secureTextEntry}
          right={
            <TextInput.Icon
              forceTextInputFocus={secureTextEntry}
              icon={secureTextEntry ? "eye-off" : "eye"}
              onPress={() => handleSecureEntry()}
            />
          }
        />
      </Box>
      <Box mt={20}>
        <TextBox
          onChangeText={setConPassword}
          label={"Re-enter Password"}
          value={confPassword}
          secureTextEntry={secureTextEntry}
          right={
            <TextInput.Icon
              forceTextInputFocus={secureTextEntry}
              icon={secureTextEntry ? "eye-off" : "eye"}
              onPress={() => handleSecureEntry()}
            />
          }
        />
      </Box>
      <Box mv={30} mb={30} ph={25}>
        <PrimaryButton label="Update Password" onPress={onHideSheets} />
      </Box>
    </Box>
  );
}
