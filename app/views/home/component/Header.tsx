import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import CustomText from "../../../components/CustomText";
import Box from "../../../components/Box";
import colors from "../../../utils/color";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { getUserToken } from "../../../utils/localStorage";
import { HomeHeaderProps } from "../../../types/propTypes";
const InstantSearches = ["Browse", "For you", "Cars", "WTB", "Saved Searches"];

export default function Header({ onLoginPress }: HomeHeaderProps) {
  const [search, setSearch] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  function getToken() {
    getUserToken().then((token) => {
      if (token) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  }

  useEffect(() => {
    getToken();
  }, []);

  return (
    <LinearGradient colors={["rgba(9, 240, 185, 0.5)", "#4E6AFF"]}>
      <Box style={styles.headerComp}>
        <CustomText
          fontFamily="Inter-Bold"
          fontSize={26}
          lineHeight={32}
          color={colors.secondary}
        >
          Car<Text style={{ fontFamily: "Inter-Regular" }}>Gasm</Text>
        </CustomText>
        <Box flexDirection="row">
          {!isLogin ? (
            <Pressable
              style={[styles.iconBg, { marginRight: 20 }]}
              onPress={onLoginPress}
            >
              <Icon name="login" size={25} color={colors.secondary} />
            </Pressable>
          ) : (
            <>
              <Pressable style={[styles.iconBg, { marginRight: 20 }]}>
                <Icon name="bell" size={25} color={colors.secondary} />
              </Pressable>
              <Pressable style={styles.iconBg}>
                <Icon name="cog-outline" size={25} color={colors.secondary} />
              </Pressable>
            </>
          )}
        </Box>
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
          <AntDesign name="search1" size={20} color={"#A1A4A9"} />
        </Box>
        <Box style={styles.saveIcon}>
          <Image
            source={require("../../../assets/images/SaveSearched.png")}
            style={{ height: 20, width: 20, resizeMode: "contain" }}
          />
        </Box>
      </Box>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Box flexDirection="row" justifyContent="space-between" ph={20}>
          {InstantSearches.map((el, index) => {
            return (
              <Pressable key={index.toString()} style={styles.box}>
                <CustomText
                  fontFamily="Inter-SemiBold"
                  color={colors.secondary}
                  fontSize={12}
                  lineHeight={15}
                >
                  {el}
                </CustomText>
              </Pressable>
            );
          })}
        </Box>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  headerComp: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  iconBg: { backgroundColor: "#46AAE5", borderRadius: 20, padding: 5 },
  inputCont: {
    width: "90%",
    height: 50,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 15,
  },
  inputStyle: {
    height: 50,
    backgroundColor: colors.secondary,
    borderRadius: 6,
    paddingStart: 40,
    color: colors.textColor,
  },
  searchIcon: { position: "absolute", top: 15, left: 10 },
  saveIcon: { position: "absolute", top: 15, right: 10 },
  box: {
    backgroundColor: "#5889F6",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    padding: 5,
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 8,
  },
});
