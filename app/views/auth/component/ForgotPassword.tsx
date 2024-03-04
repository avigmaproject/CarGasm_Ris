import React, { useEffect, useState } from "react";
import Box from "../../../components/Box";
import CustomText from "../../../components/CustomText";
import TextBox from "../../../components/TextBox";
import PrimaryButton from "../../../components/PrimaryButton";
import { RouteScreenProps, useSheetRouter } from "react-native-actions-sheet";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import { isEmailValid } from "../../../utils/regex";
import { useDispatch } from "react-redux";
import { onForgotPassword } from "../../../redux/ducks/forgotpassword";
import { useAppSelector } from "../../../utils/hooks";
import { snackBar } from "../../../utils/helper";
import Loader from "../../../components/Loader";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<any>();
  const selectForgotPassword = useAppSelector((state) => state.forgotpassword);
  const router = useSheetRouter("sheet-router");

  async function onContinue() {
    if (isEmailValid(email)) {
      setLoading(true);
      generateLink();
      setEmailError("");
    } else {
      setEmailError("Invalid Email");
    }
  }

  useEffect(() => {
    if (selectForgotPassword.called) {
      setLoading(false);
      const { error, userCode } = selectForgotPassword;
      console.log("userCode", selectForgotPassword[0].userCode);

      if (selectForgotPassword[0].userCode === "Sucesss") {
        snackBar("Email sent on your registered Email ID", "green");
        router?.navigate("route-c", { email: email });
      } else {
        snackBar("Email is not registered", "red");
      }
    }
  }, [selectForgotPassword]);

  const generateLink = async () => {
    const link = await dynamicLinks().buildShortLink({
      link: `https://cargasmrn.page.link/forgetpassword/${email}`,
      domainUriPrefix: "https://cargasmrn.page.link",
      ios: {
        bundleId: "org.reactjs.native.example.CarGasmRN",
        appStoreId: "",
        fallbackUrl: "",
      },
      android: {
        packageName: "com.cargasmrn",
        fallbackUrl: "",
      },
      navigation: {
        forcedRedirectEnabled: true,
      },
    });
    console.log(link);
    await dispatch(onForgotPassword(email, 1, 1, link));
  };

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
          error={emailError}
        />
      </Box>
      <Box mv={30} mb={30} ph={25}>
        <PrimaryButton label="Continue" onPress={onContinue} />
      </Box>
    </Box>
  );
}
