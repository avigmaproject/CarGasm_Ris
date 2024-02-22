import React, { useState } from "react";
import Box from "../../../components/Box";
import CustomText from "../../../components/CustomText";
import TextBox from "../../../components/TextBox";
import PrimaryButton from "../../../components/PrimaryButton";
import { RouteScreenProps, useSheetRouter } from "react-native-actions-sheet";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import { isEmailValid } from "../../../utils/regex";
import { useDispatch } from "react-redux";
import { onForgotPassword } from "../../../redux/ducks/forgotpassword";

export default function ForgotPassword() {
  const [email, setEmail] = useState("rish12@gmail.com");
  const [link, setLink] = useState("");
  const router = useSheetRouter();
  const [emailError, setEmailError] = useState("");
  const dispatch = useDispatch<any>();

  function onContinue() {
    if (isEmailValid(email)) {
      generateLink();
      setEmailError("");
      if (link) {
        dispatch(onForgotPassword(email, 1, 1, link));
      }
    } else {
      setEmailError("Invalid Email");
    }
    // router?.navigate("route-b");
  }

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
    setLink(link);
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
