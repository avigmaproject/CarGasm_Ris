import React, { useEffect, useState } from "react";
import Box from "../../../components/Box";
import CustomText from "../../../components/CustomText";
import PrimaryButton from "../../../components/PrimaryButton";
import TextBox from "../../../components/TextBox";
import { TextInput } from "react-native-paper";
import {
  useSheetRef,
  useSheetRouteParams,
  useSheetRouter,
} from "react-native-actions-sheet";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../../redux/ducks/profile";
import { useAppSelector } from "../../../utils/hooks";
import { snackBar } from "../../../utils/helper";
import Loader from "../../../components/Loader";

export default function ResetPassword() {
  const [password, setPassword] = useState("hello");
  const [cpassword, setCPassword] = useState("hello");
  const [secureTextEntry, setsecureTextEntry] = useState(true);
  const [errors, setErrors] = useState<ResetPasswordErros>();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<any>();
  const actionSheetRef = useSheetRef();
  const params = useSheetRouteParams("sheet-router", "route-b");

  const selectResetPassword = useAppSelector((state) => state.profile);

  const handleSecureEntry = () => {
    setsecureTextEntry(!secureTextEntry);
  };

  function validateInputs() {
    const tempErrors: SignupErrors = {};

    if (password.length === 0) {
      tempErrors.password = "Enter a valid password";
    }
    if (password !== cpassword) {
      tempErrors.cpassword = "Password did not match";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }

  const onHideSheets = () => {
    const isValid = validateInputs();
    if (isValid) {
      setLoading(true);
      dispatch(updateProfile(params.email, password, 5));
    }
  };

  useEffect(() => {
    if (selectResetPassword.called) {
      setLoading(false);
      const { error } = selectResetPassword;
      if (!error) {
        snackBar("Password changed succesfully", "green");
        actionSheetRef.current.hide();
      }
    }
  }, [selectResetPassword]);

  return (
    <Box ph={20} pv={10}>
      {loading && <Loader isSheet />}
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
          error={errors?.password}
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
          onChangeText={setCPassword}
          label={"Re-enter Password"}
          value={cpassword}
          secureTextEntry={false}
          error={errors?.cpassword}
          // right={
          //   <TextInput.Icon
          //     forceTextInputFocus={secureTextEntry}
          //     icon={secureTextEntry ? "eye-off" : "eye"}
          //     onPress={() => handleSecureEntry()}
          //   />
          // }
        />
      </Box>
      <Box mv={30} mb={30} ph={25}>
        <PrimaryButton label="Update Password" onPress={onHideSheets} />
      </Box>
    </Box>
  );
}
