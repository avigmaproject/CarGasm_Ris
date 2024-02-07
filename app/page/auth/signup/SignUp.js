import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import TextBox from "../../../components/TextBox";
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import { basecolor, appblack } from "../../../utils/color";
import Label from "../../../components/Label";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Social from "../../../components/Social";
import {isValidEmail} from '../../../utils/commanfunction'
export default function SignUp({ navigation }) {
    const [form, setform] = useState({
        fullname: "",
        email: "",
        password: "",
        cpassword: "",
        phonenumber: ""
    });
    const [secureTextEntry, setsecureTextEntry] = useState(true);
    const [termcondition, settermcondition] = useState(false);
    const [fullNameerror, setfullNameerror] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [cpasswordError, setcPasswordError] = useState("");
    const { fullname, email, password, cpassword, phonenumber } = form;
    const handleOnChangeText = (value, fieldName) => {
        setform({ ...form, [fieldName]: value });
    };
    const handleSecureEntry = () => {
        setsecureTextEntry(!secureTextEntry);
    };
    const onHandleTermsAndCondition = () => {
        settermcondition(!termcondition);
    };
    const isValidForm = () => {
        var Validation1,
            Validation4,
            Validation3,
            Validation2 = true;

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
        if (!cpassword) {
            setcPasswordError("Confirm Password required*");
            Validation3 = false;
        } else if (!cpassword.trim() || cpassword.length < 8) {
            setcPasswordError("Confirm Password must be atleast 8 character long!");
            Validation3 = false;
        } else if (cpassword.trim() !== password.trim()) {
            setcPasswordError("Confirm Password and password does't match.");
            Validation3 = false;
        } else {
            setcPasswordError("");
            Validation3 = true;
        }
        if (!fullname) {
            setfullNameerror("Full Name required*");
            Validation4 = false;
        } else {
            setfullNameerror("");
            Validation4 = true;
        }
        return Validation1 && Validation2 && Validation3 && Validation4;
    };
    const OnHandleRegister = () => {
        console.log(form)
        if (isValidForm()) {
            console.log(form)
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, flexGrow: 1 }}>
            <ScrollView
                contentContainerStyle={{
                    justifyContent: "space-between",
                    flex: 1,
                    flexGrow: 1,
                    marginHorizontal: 10,
                }}
            >
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
                                onChangeText={(value) => handleOnChangeText(value, "fullname")}
                                label={"Full Name*"}
                                value={fullname}
                                error={fullNameerror}
                            />
                            <TextBox
                                onChangeText={(value) => handleOnChangeText(value, "email")}
                                label={"Email address*"}
                                value={email}
                                keyboardType={"email-address"}
                                error={emailError}
                            />
                            <TextBox
                                onChangeText={(value) => handleOnChangeText(value, "phonenumber")}
                                label={"Phone Number*"}
                                value={phonenumber}
                            />
                            <TextBox
                                onChangeText={(value) => handleOnChangeText(value, "password")}
                                label={"Password*"}
                                value={password}
                                error={passwordError}
                                secureTextEntry={secureTextEntry}
                                right={
                                    <TextInput.Icon
                                        forceTextInputFocus={secureTextEntry}
                                        icon={secureTextEntry ? "eye-off" : "eye"}
                                        onPress={() => handleSecureEntry()}
                                        iconColor="black"
                                    />
                                }
                            />
                            <TextBox
                                onChangeText={(value) => handleOnChangeText(value, "cpassword")}
                                label={"Confirm Password*"}
                                value={cpassword}
                                secureTextEntry={secureTextEntry}
                                error={cpasswordError}
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
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <TouchableOpacity onPress={() => onHandleTermsAndCondition()}>
                                    <MaterialCommunityIcons
                                        name={
                                            termcondition
                                                ? "checkbox-marked"
                                                : "checkbox-blank-outline"
                                        }
                                        size={18}
                                        color={basecolor}
                                        style={{ marginRight: 5 }}
                                    />
                                </TouchableOpacity>
                                <Label
                                    color={appblack}
                                    fontSize={12}
                                    label={"I agree with the Terms of Service & Privacy Policy"}
                                    fontFamily={"Inter-Bold"}
                                    fontWeight={"bold"}
                                />
                            </View>
                        </View>
                        <Button onPress={() => OnHandleRegister()} title={"Sign Up"} />
                        <Social />
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    <Label
                        color={appblack}
                        fontSize={14}
                        label={"Already have an account?"}
                        fontFamily={"Inter-Bold"}
                        fontWeight={"bold"}
                    />
                    <Label
                        onPress={() => navigation.navigate("Login")}
                        color={basecolor}
                        fontSize={14}
                        label={" Sign In"}
                        fontFamily={"Inter-Bold"}
                        fontWeight={"bold"}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
