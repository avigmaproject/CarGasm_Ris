import { View, Text, Pressable } from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function Header(props) {
  return (
    <View
      style={{
        height: 40,
        flexDirection: "row",
      }}
    >
      {props.back && (
        <Pressable
          style={{
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
            height: 35,
            width: 35,
            borderRadius: 10,
          }}
          onPress={props.onPress}
        >
          <AntDesign name={"left"} color={"black"} size={20} />
        </Pressable>
      )}
      {props.title && <Text>{props.title}</Text>}
    </View>
  );
}
