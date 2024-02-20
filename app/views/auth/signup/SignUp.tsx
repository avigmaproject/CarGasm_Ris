import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  StyleSheet,
  Image,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import TextBox from "../../../components/TextBox";
import Header from "../../../components/Header";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Box from "../../../components/Box";
import CustomText from "../../../components/CustomText";
import TextButton from "../../../components/TextButton";
import PrimaryButton from "../../../components/PrimaryButton";
import colors from "../../../utils/color";
import { SignUpProps } from "../../../types/propTypes";
const androidImages = [
  require("../../../assets/images/Facebook.png"),
  require("../../../assets/images/Google.png"),
];

const iosImages = [
  require("../../../assets/images/Facebook.png"),
  require("../../../assets/images/Google.png"),
  require("../../../assets/images/Apple.png"),
];

export default function SignUp({ navigation }: SignUpProps) {
  const [form, setform] = useState({
    fullname: "",
    email: "",
    password: "",
    cpassword: "",
    phonenumber: "",
  });
  const [secureTextEntry, setsecureTextEntry] = useState(true);
  const [termcondition, settermcondition] = useState(false);
  const [fullNameerror, setfullNameerror] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [cpasswordError, setcPasswordError] = useState("");
  const { fullname, email, password, cpassword, phonenumber } = form;
  const handleOnChangeText = (value: any, fieldName: string) => {
    setform({ ...form, [fieldName]: value });
  };
  const handleSecureEntry = () => {
    setsecureTextEntry(!secureTextEntry);
  };
  const onHandleTermsAndCondition = () => {
    settermcondition(!termcondition);
  };

  const OnHandleRegister = () => {
    console.log(form);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
                Sign Up 👋
              </CustomText>

              <CustomText
                fontFamily="Inter-Regular"
                fontSize={16}
                lineHeight={20}
                color={colors.appblack}
                style={{ marginTop: 5 }}
              >
                Please sign up to enter in a app
              </CustomText>
            </Box>
          </Box>
        </Box>
        <Box ph={15}>
          <TextBox
            onChangeText={(value: any) => handleOnChangeText(value, "fullname")}
            label={"Full Name*"}
            value={fullname}
            error={fullNameerror}
          />
          <TextBox
            onChangeText={(value: any) => handleOnChangeText(value, "email")}
            label={"Email address*"}
            value={email}
            keyboardType={"email-address"}
            error={emailError}
          />
          <TextBox
            onChangeText={(value: any) =>
              handleOnChangeText(value, "phonenumber")
            }
            label={"Phone Number*"}
            value={phonenumber}
          />
          <TextBox
            onChangeText={(value: any) => handleOnChangeText(value, "password")}
            label={"Password*"}
            value={password}
            error={passwordError}
            secureTextEntry={secureTextEntry}
            right={
              <TextInput.Icon
                forceTextInputFocus={secureTextEntry}
                icon={secureTextEntry ? "eye-off" : "eye"}
                onPress={() => handleSecureEntry()}
              />
            }
          />
          <TextBox
            onChangeText={(value: any) =>
              handleOnChangeText(value, "cpassword")
            }
            label={"Confirm Password*"}
            value={cpassword}
            secureTextEntry={secureTextEntry}
            error={cpasswordError}
            right={
              <TextInput.Icon
                forceTextInputFocus={secureTextEntry}
                icon={secureTextEntry ? "eye-off" : "eye"}
                onPress={() => handleSecureEntry()}
              />
            }
          />

          <Box flexDirection="row" alignItems="center" mt={15}>
            <TouchableOpacity onPress={() => onHandleTermsAndCondition()}>
              <MaterialCommunityIcons
                name={
                  termcondition ? "checkbox-marked" : "checkbox-blank-outline"
                }
                size={25}
                color={termcondition ? colors.primary : "#677294"}
                style={{ marginRight: 5 }}
              />
            </TouchableOpacity>
            <CustomText
              fontFamily="Inter-Regular"
              fontSize={12}
              lineHeight={15}
              color={"#677294"}
            >
              I agree with the Terms of Service & Privacy Policy
            </CustomText>
          </Box>

          <Box mt={20}>
            <PrimaryButton
              label="Sign Up"
              onPress={() => console.log("Hello")}
            />
          </Box>
          <Box flexDirection="row" justifyContent="space-around" mt={20}>
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
              Already have an account?
            </CustomText>
            <TextButton
              label=" Sign In"
              style={{ fontSize: 14, fontFamily: "Inter-Bold" }}
              onPress={() => navigation.navigate("Login")}
            />
          </Box>
        </Box>
      </ScrollView>
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
    // marginTop: Platform.OS === "ios" ? 50 : 0,
  },
  bottomText: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
