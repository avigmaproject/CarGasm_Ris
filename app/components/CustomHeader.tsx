import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native"
import React from "react"
import LinearGradient from "react-native-linear-gradient"
import CustomText from "./CustomText"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import colors from "../utils/color"
import { Image } from "react-native"
import { CustomHeaderProps } from "../types/propTypes"
import Box from "./Box"
import { useNavigation } from "@react-navigation/native"
import { pixelSizeVertical } from "../utils/responsive"
const height = Dimensions.get("window").height

export default function CustomHeader({
  title,
  isDetail = false,
  iconName,
  back = false,
  onPressIconName,
  isSecondIcon = false,
  isProfile = false,
  isSellerprofile = false,
  ischat,
  userimg,
  ischaticon
}: CustomHeaderProps) {
  const navigation = useNavigation()
  return (
    <LinearGradient
      colors={["rgba(9, 240, 185, 0.5)", "#4E6AFF"]}
      style={[
        isSellerprofile ? styles.sellerheight : styles.container,
        isProfile && styles.height
      ]}
    >
      {back && (
        <Pressable style={styles.back} onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={30} color={colors.appblack} />
        </Pressable>
      )}
      {ischat && (
        <Image
          source={{ uri: userimg }}
          style={{
            height: 40,
            width: 40,
            resizeMode: "contain",
            borderRadius: 20,
            marginRight: 10
          }}
        />
      )}
      <CustomText
        fontFamily="Inter-Bold"
        fontSize={22}
        color={colors.secondary}
        style={{ right: isDetail ? 15 : 0 }}
      >
        {title}
      </CustomText>

      <Box style={[styles.icon, isProfile && styles.iconProfile]}>
        {isDetail && (
          <Pressable style={[styles.circle, { right: 10 }]}>
            <Image
              source={require("../assets/images/Arrow.png")}
              style={{ height: 22, width: 22, resizeMode: "contain" }}
            />
          </Pressable>
        )}
        {isSecondIcon && (
          <Pressable style={styles.circle} onPress={onPressIconName}>
            <Icon name={iconName} color={colors.secondary} size={22} />
          </Pressable>
        )}
        {ischaticon && (
          <Pressable style={styles.menu} onPress={() => console.log("Hello")}>
            <Icon name="dots-vertical" color={colors.secondary} size={26} />
          </Pressable>
        )}
      </Box>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingVertical: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  back: {
    backgroundColor: colors.secondary,
    borderRadius: 8,
    position: "absolute",
    left: 20
  },
  circle: {
    padding: 8,
    backgroundColor: "rgba(80,152,239,0.5)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  menu: {
    backgroundColor: colors.lightPrimary,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    position: "absolute",
    right: 20,
    flexDirection: "row"
  },
  height: {
    paddingBottom: pixelSizeVertical(70)
  },
  iconProfile: {
    top: 22
  },
  margintop: {
    marginTop: 10
  },
  sellerheight: {
    paddingBottom: pixelSizeVertical(170),
    flexDirection: "row",
    justifyContent: "center"
  }
})
