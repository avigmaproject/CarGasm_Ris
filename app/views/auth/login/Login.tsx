import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  SafeAreaView,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import TextBox from "../../../components/TextBox";
import Header from "../../../components/Header";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { isEmailValid } from "../../../utils/regex";
import colors from "../../../utils/color";
import CustomText from "../../../components/CustomText";
import Box from "../../../components/Box";
import TextButton from "../../../components/TextButton";
import PrimaryButton from "../../../components/PrimaryButton";
import { Image } from "react-native";
import { LoginProps } from "../../../types/propTypes";
import ActionSheet, {
  Route,
  useSheetRef,
  SheetManager,
} from "react-native-actions-sheet";
import ForgotPassword from "../component/ForgotPassword";
import OtpPage from "../component/OtpPage";
import ResetPassword from "../component/ResetPassword";
import { useDispatch } from "react-redux";
import { onLogin } from "../../../redux/ducks/login";

const androidImages = [
  require("../../../assets/images/Facebook.png"),
  require("../../../assets/images/Google.png"),
];

const iosImages = [
  require("../../../assets/images/Facebook.png"),
  require("../../../assets/images/Google.png"),
  require("../../../assets/images/Apple.png"),
];

export default function Login({ navigation }: LoginProps) {
  const [email, setEmail] = useState("test1@gmail.com");
  const [password, setPassword] = useState("Test@123");
  const [secureTextEntry, setsecureTextEntry] = useState(true);
  const [rememberpassword, setrememberpassword] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>();
  const actionSheetRef = useSheetRef();
  const dispatch = useDispatch<any>();

  const routes: Route[] = [
    {
      name: "route-a",
      component: ForgotPassword,
    },
    {
      name: "route-b",
      component: OtpPage,
    },
    {
      name: "route-c",
      component: ResetPassword,
    },
  ];

  const handleSecureEntry = () => {
    setsecureTextEntry(!secureTextEntry);
  };
  const onHandleRememberPassword = () => {
    setrememberpassword(!rememberpassword);
  };

  function forgotPassSheet() {
    // actionSheetRef.current?.show();
    SheetManager.show("reset-password");
  }

  function validateInputs() {
    const tempErrors: LoginErrors = {};
    if (!isEmailValid(email)) {
      tempErrors.email = "Enter a valid email";
    }
    if (password.length === 0) {
      tempErrors.password = "Enter a valid password";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }

  const onSubmit = () => {
    Keyboard.dismiss();
    const isValid = validateInputs();
    if (isValid) {
      dispatch(onLogin(email, password, 1));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Box style={styles.headerContainer}>
        <Box ph={15} mt={15}>
          <Header back onPress={() => navigation.goBack()} />
          <Box mv={10}>
            <CustomText
              fontFamily="Inter-Bold"
              fontSize={26}
              lineHeight={32}
              color={colors.textColor}
            >
              Sign In 👋
            </CustomText>

            <CustomText
              fontFamily="Inter-Regular"
              fontSize={16}
              lineHeight={20}
              color={colors.appblack}
              style={{ marginTop: 5 }}
            >
              Please sign in to enter in a app
            </CustomText>
          </Box>
        </Box>
      </Box>
      <Box ph={15}>
        <TextBox
          onChangeText={setEmail}
          label={"Email address*"}
          value={email}
          keyboardType={"email-address"}
          error={errors?.email}
        />
        <TextBox
          onChangeText={setPassword}
          label={"Password*"}
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
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          pv={5}
        >
          <Box flexDirection="row" alignItems="center" mv={20}>
            <TouchableOpacity onPress={() => onHandleRememberPassword()}>
              <MaterialCommunityIcons
                name={
                  rememberpassword
                    ? "checkbox-marked"
                    : "checkbox-blank-outline"
                }
                size={25}
                color={rememberpassword ? colors.primary : "#677294"}
                style={{ marginRight: 5 }}
              />
            </TouchableOpacity>
            <CustomText
              fontFamily="Inter-Regular"
              fontSize={12}
              lineHeight={15}
              color={"#677294"}
            >
              Remember Password
            </CustomText>
          </Box>
          <Box>
            <TextButton label="Forgot password?" onPress={forgotPassSheet} />
          </Box>
        </Box>
        <Box mv={10}>
          <PrimaryButton label="Sign In" onPress={onSubmit} />
        </Box>
        <Box flexDirection="row" justifyContent="space-around" mv={20}>
          {(Platform.OS === "android" ? androidImages : iosImages).map(
            (el, index) => {
              return (
                <Image
                  key={index.toString()}
                  source={el}
                  style={{ height: 65, width: 65 }}
                />
              );
            }
          )}
        </Box>
        <Box style={styles.bottomText}>
          <CustomText
            color={colors.appblack}
            fontSize={14}
            fontFamily="Inter-Bold"
          >
            Don't have an account?
          </CustomText>
          <TextButton
            label=" Sign Up"
            style={{ fontSize: 14, fontFamily: "Inter-Bold" }}
            onPress={() => navigation.navigate("SignUp")}
          />
        </Box>
      </Box>

      <ActionSheet
        ref={actionSheetRef}
        id="reset-password"
        headerAlwaysVisible
        enableRouterBackNavigation={true}
        routes={routes}
        initialRoute="route-a"
        indicatorStyle={{
          width: "50%",
          marginTop: 20,
          backgroundColor: "#C4C4C4",
        }}
      >
        <ForgotPassword />
      </ActionSheet>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: "#EFECEC",
  },
  headerContainer: {
    backgroundColor: "#EFECEC",
  },
  bottomText: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
});
