import { TouchableOpacity, Text, Image } from "react-native"
import React from "react"
import LinearGradient from "react-native-linear-gradient"
import Label from "./Label"
import { basecolor, lightblack, blackopecity, white } from "../utils/color"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
export default function Button({
  title,
  onPress,
  width,
  height,
  color,
  color1,
  fontWeight,
  fontSize,
  fontcolor,
  image1,
  tintColor,
  iconcolor
}) {
  return (
    <TouchableOpacity
      // disabled={disable}
      style={{
        // shadowColor: color1 === blackopecity ? null : basecolor,
        // shadowOpacity: 0.7,
        // shadowOffset: { width: 0, height: 2 },
        // shadowRadius: 2,
        // elevation: 1,
        // borderWidth: color1 === blackopecity ? 1 : 0,

        flexDirection: "row",
        justifyContent: "center"
      }}
      onPress={onPress}
    >
      <LinearGradient
        colors={[color, color1]}
        // colors={["#09F0B9", "#4E6AFF"]}
        style={{
          height: height ? height : 60,
          width: "100%",

          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          flexDirection: "row"
        }}
      >
        {image1 ? (
          <Image
            style={{ height: 20, width: 20, marginRight: 10 }}
            source={image1}
            tintColor={tintColor}
          />
        ) : (
          <Icon
            name="heart-outline"
            color={iconcolor}
            size={25}
            style={{ marginRight: 10 }}
          />
        )}
        <Text
          style={{
            color: fontcolor ? fontcolor : "black",
            fontSize: fontSize ? fontSize : 14,
            fontWeight: fontWeight ? fontWeight : "500"
          }}
        >
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}
