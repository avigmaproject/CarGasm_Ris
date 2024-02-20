import React, { useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import Box from "../../components/Box";
import CustomText from "../../components/CustomText";
import PrimaryButton from "../../components/PrimaryButton";
import { WelcomeProps } from "../../types/propTypes";
import colors from "../../utils/color";
import Icon from "react-native-vector-icons/AntDesign";

export default function Welcome({ navigation }: WelcomeProps) {
  const [search, setSearch] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <Box>
        <Image
          source={require("../../assets/images/Welcome/Rectangle.png")}
          style={{ height: 180, width: "100%" }}
        />
        <Image
          source={require("../../assets/images/Welcome/carRight.png")}
          style={{
            height: 180,
            width: 100,
            position: "absolute",
            right: 0,
          }}
          resizeMode="contain"
        />

        <Image
          source={require("../../assets/images/Welcome/carleft.png")}
          style={{
            height: 180,
            width: 100,
            position: "absolute",
            left: 0,
          }}
          resizeMode="contain"
        />
        <Box style={styles.headerComp}>
          <CustomText
            fontFamily="Inter-Bold"
            fontSize={34}
            lineHeight={42}
            color={colors.secondary}
            style={{ textAlign: "center" }}
          >
            Car<Text style={{ fontFamily: "Inter-Regular" }}>Gasm</Text>
          </CustomText>
          <CustomText
            fontFamily="Inter-SemiBold"
            fontSize={20}
            lineHeight={24}
            color={colors.secondary}
            style={{ textAlign: "center", marginTop: 5 }}
          >
            Welcome to CarGasm
          </CustomText>
        </Box>
        <Box style={styles.inputCont}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Search Item here..."
            placeholderTextColor={"#A1A4A9"}
            value={search}
            onChangeText={setSearch}
          />
          <Box style={styles.searchIcon}>
            <Icon name="search1" size={20} color={"#A1A4A9"} />
          </Box>
        </Box>
      </Box>
      <Box>
        <Box mt={35} ph={15}>
          <CustomText
            fontSize={16}
            lineHeight={26}
            color="#8F8F8F"
            fontFamily="Inter-Regular"
            style={{ textAlign: "center" }}
          >
            Lorem Ipsum has been the industry's standard dummy text ever since.
          </CustomText>
          <Box mt={30}>
            <PrimaryButton
              label="Sign In"
              onPress={() => navigation.navigate("Login")}
            />
          </Box>
          <Box mt={20}>
            <PrimaryButton
              label="Create An Account"
              onPress={() => navigation.navigate("SignUp")}
              varient="Secondary"
            />
          </Box>
          <Box mt={20}>
            <PrimaryButton
              label="Hot Deals"
              onPress={() => navigation.navigate("Login")}
              varient="HotDeal"
            />
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerComp: {
    position: "absolute",
    alignSelf: "center",
    top: 25,
  },
  inputCont: {
    position: "absolute",
    bottom: 15,
    width: "90%",
    height: 50,
    alignSelf: "center",
  },
  inputStyle: {
    height: 50,
    backgroundColor: colors.secondary,
    borderRadius: 6,
    paddingStart: 40,
    color: colors.textColor,
  },
  searchIcon: { position: "absolute", top: 15, left: 10 },
});
