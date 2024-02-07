import { View, Text, TouchableOpacity, SafeAreaView ,Modal,StyleSheet} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import TextBox from "../../../components/TextBox";
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import { basecolor, appblack } from "../../../utils/color";
import Label from "../../../components/Label";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Social from "../../../components/Social";
import { isValidEmail } from '../../../utils/commanfunction'

export default function Login({ navigation }) {
  const [form, setform] = useState({
    email: "",
    password: "",
  });
  const [secureTextEntry, setsecureTextEntry] = useState(true);
  const [rememberpassword, setrememberpassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [modalVisible, setModalVisible] = useState(true);

  const { email, password } = form;
  const handleOnChangeText = (value, fieldName) => {
    setform({ ...form, [fieldName]: value });
  };
  const handleSecureEntry = () => {
    setsecureTextEntry(!secureTextEntry);
  };
  const onHandleRememberPassword = () => {
    setrememberpassword(!rememberpassword)
  }
  const isValidForm = () => {
    var Validation1, Validation2 = true;
    if (!email) {
      setEmailError("Email is required*");
      Validation1 = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Invalid email!");
      Validation1 = false;
    } else {
      setEmailError("");
      Validation1 = true;
    }
    if (!password) {
      setPasswordError("Password required*");
      Validation2 = false;
    } else if (!password.trim() || password.length < 8) {
      setPasswordError("Password must be atleast 8 character long!");
      Validation2 = false;
    } else {
      setPasswordError("");
      Validation2 = true;
    }
    return Validation1 && Validation2;
  };
  const OnHandleLogin = () => {
    console.log(form)
    if (isValidForm()) {
      console.log(form)
    }
  }
  const BottomModal = () => {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
              
            </View>
          </View>
        </Modal>
       
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, flexGrow: 1 }}>
      <View style={{ justifyContent: "space-between", flex: 1, flexGrow: 1, marginHorizontal: 10, }}>
        <View style={{}}>
          <Header back />
          <View style={{ height: "78%", justifyContent: "space-between" }}>
            <View>
              <Label
                color={appblack}
                fontSize={26}
                label={"Sign In 👋"}
                fontFamily={"Inter-Bold"}
                fontWeight={"bold"}
              />
              <Label
                color={appblack}
                fontSize={16}
                label={"Please sign in to enter in a app"}
                fontFamily={"Inter-Bold"}
                fontWeight={"400"}
                style={{ marginTop: 15 }}
              />
            </View>
            <View>
              <TextBox
                onChangeText={(value) => handleOnChangeText(value, "email")}
                label={"Email address*"}
                value={email}
                keyboardType={"email-address"}
                error={emailError}
              />
              <TextBox
                onChangeText={(value) => handleOnChangeText(value, "password")}
                label={"Password*"}
                value={password}
                secureTextEntry={secureTextEntry}
                error={passwordError}
                right={
                  <TextInput.Icon
                    forceTextInputFocus={secureTextEntry}
                    icon={secureTextEntry ? "eye-off" : "eye"}
                    onPress={() => handleSecureEntry()}
                    iconColor="black"
                  />
                }
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <View style={{
                flexDirection: "row",
                alignItems: "center",
              }}>
                <TouchableOpacity

                  onPress={() => onHandleRememberPassword()}
                >
                  <MaterialCommunityIcons
                    name={
                      rememberpassword ? "checkbox-marked" : "checkbox-blank-outline"
                    }
                    size={18}
                    color={basecolor}
                    style={{ marginRight: 5 }}
                  />

                </TouchableOpacity>
                <Label
                  color={appblack}
                  fontSize={12}
                  label={"Remember Password"}
                  fontFamily={"Inter-Bold"}
                  fontWeight={"bold"}
                />
              </View>
              <View>
                <Label
                  onPress={() => alert("forgot password")}
                  color={appblack}
                  fontSize={12}
                  label={"Forgot password?"}
                  fontFamily={"Inter-Bold"}
                  fontWeight={"bold"}
                />
              </View>
            </View>
            <Button onPress={() => OnHandleLogin()} title={"Login"} />
            <Social />
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Label
            color={appblack}
            fontSize={14}
            label={"Don't have an account?"}
            fontFamily={"Inter-Bold"}
            fontWeight={"bold"}
          />
          <Label
            onPress={() => navigation.navigate("SignUp")}
            color={basecolor}
            fontSize={14}
            label={" Sign Up"}
            fontFamily={"Inter-Bold"}
            fontWeight={"bold"}
          />
        </View>
      </View>
      {BottomModal()}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  position:"absolute",
  zIndex:1,
  width:"100%",
  bottom:0,
  height:"40%"
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width:"100%",
    height:"100%"
  },
  modalText: {
    textAlign: 'center',
  },
});