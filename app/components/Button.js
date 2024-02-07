import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { basecolor, white } from "../utils/color";
import Label from "../components/Label";

export default function Button(props) {
  return (
    <View style={{ marginTop: 10 }}>
      <TouchableOpacity
      onPress={props.onPress}
        style={{
          backgroundColor: basecolor,
          width: "100%",
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          borderRadius:10
        }}
      >
        <Label
          fontFamily={"Poppins-SemiBold"}
          fontWeight={"bold"}
          color={white}
          fontSize={15}
          marginLeft={20}
          label={props.title}
        />
      </TouchableOpacity>
    </View>
  );
}
