import { View, Text, Pressable } from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { HeaderProps } from "../types/propTypes";
import CustomText from "./CustomText";
import colors from "../utils/color";


export default function Header({ back, title, onPress }: HeaderProps) {
  return (
    <View
      style={{
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {back && (
        <Pressable
          style={{
            backgroundColor: "#FFFFFF",
            justifyContent: "center",
            alignItems: "center",
            height: 35,
            width: 35,
            borderRadius: 10,
            position: "absolute",
            left: 0,
            elevation: 2,
            shadowRadius: 2,
            shadowColor: "rgba(0, 0, 0, 0.5)",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
          }}
          onPress={onPress}
        >
          <AntDesign name={"left"} color={"black"} size={20} />
        </Pressable>
      )}
      <View>
        {title && (
          <CustomText
            fontSize={22}
            lineHeight={27}
            fontFamily="Inter-Bold"
            color={colors.textColor}
          >
            {title}
          </CustomText>
        )}
      </View>
    </View>
  );
}
