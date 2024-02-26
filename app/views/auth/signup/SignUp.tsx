import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  StyleSheet,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
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
import { useAppSelector } from "../../../utils/hooks";
import GlobalContext from "../../../contexts/GlobalContext";
import { useDispatch } from "react-redux";
import { isEmailValid, isNameValid } from "../../../utils/regex";
import { onLogin } from "../../../redux/ducks/login";
import Loader from "../../../components/Loader";
import { snackBar } from "../../../utils/helper";
import { onRegister } from "../../../redux/ducks/signup";
import LinearGradient from "react-native-linear-gradient";
import {
  pixelSizeHorizontal,
  pixelSizeVertical,
} from "../../../utils/responsive";
import { gradient_android, gradient_ios } from "../../../utils/constant";
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
  const [name, setName] = useState("Rish jain");
  const [email, setEmail] = useState("ris@mail.com");
  const [password, setPassword] = useState("hello");
  const [cpassword, setCPassword] = useState("hello");
  const [phoneNumber, setPhoneNumber] = useState("1234567890");
  const [secureTextEntry, setsecureTextEntry] = useState(true);
  const [termcondition, settermcondition] = useState(false);
  const [errors, setErrors] = useState<SignupErrors>();
  const [loading, setLoading] = useState(false);

  const selectRegister = useAppSelector((state) => state.signup);
  const { setAuthenticated, setFromLogin, setGlobalUserName } =
    useContext(GlobalContext);

  const dispatch = useDispatch<any>();

  const handleSecureEntry = () => {
    setsecureTextEntry(!secureTextEntry);
  };
  const onHandleTermsAndCondition = () => {
    settermcondition(!termcondition);
  };

  function validateInputs() {
    const tempErrors: SignupErrors = {};
    if (!isEmailValid(email)) {
      tempErrors.email = "Enter a valid email";
    }
    if (password.length === 0) {
      tempErrors.password = "Enter a valid password";
    }
    if (password !== cpassword) {
      tempErrors.cpassword = "Password did not match";
    }
    if (!isNameValid(name)) {
      tempErrors.name = "Enter a valid name";
    }
    if (phoneNumber.length === 0) {
      tempErrors.phone = "Enter a valid phone number";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }

  const OnHandleRegister = () => {
    const isValid = validateInputs();
    if (isValid && termcondition) {
      setLoading(true);
      dispatch(onRegister(email, password, 2, name, phoneNumber));
    } else {
      snackBar("Please agree terms and privacy policy", "red");
    }
  };

  useEffect(() => {
    if (selectRegister.called) {
      setLoading(false);
      const { error, errorCode, userToken } = selectRegister;
      if (errorCode === "1" && !error) {
        snackBar("User Created Succesfully!", "green");
        setAuthenticated(true);
        setFromLogin(false);
        setGlobalUserName(name);
      } else {
        snackBar(userToken, "red");
      }
    }
  }, [selectRegister]);

  return (
    <LinearGradient
      style={styles.container}
      colors={Platform.OS === "ios" ? gradient_ios : gradient_android}
    >
      {loading && <Loader />}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box style={styles.header}>
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
            onChangeText={setName}
            label={"Full Name*"}
            value={name}
            error={errors?.name}
          />
          <TextBox
            onChangeText={setEmail}
            label={"Email address*"}
            value={email}
            keyboardType={"email-address"}
            error={errors?.email}
          />
          <TextBox
            onChangeText={setPhoneNumber}
            label={"Phone Number*"}
            value={phoneNumber}
            error={errors?.phone}
          />
          <TextBox
            onChangeText={setPassword}
            label={"Password*"}
            value={password}
            error={errors?.password}
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
            onChangeText={setCPassword}
            label={"Confirm Password*"}
            value={cpassword}
            secureTextEntry={secureTextEntry}
            error={errors?.cpassword}
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
            <PrimaryButton label="Sign Up" onPress={OnHandleRegister} />
          </Box>
          <Box flexDirection="row" justifyContent="space-around" mt={20}>
            {(Platform.OS === "android" ? androidImages : iosImages).map(
              (el, index) => {
                return (
                  <Image
                    key={index.toString()}
                    source={el}
                    style={{
                      height: pixelSizeVertical(60),
                      width: pixelSizeHorizontal(60),
                    }}
                  />
                );
              }
            )}
          </Box>
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
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },

  bottomText: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
    paddingTop: pixelSizeVertical(20),
  },
  header: {
    marginTop: Platform.OS === "ios" ? 30 : 0,
  },
});
