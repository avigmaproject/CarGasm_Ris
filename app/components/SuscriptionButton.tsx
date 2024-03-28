import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { SuscriptionButtonProps } from "../types/propTypes";
import Box from "./Box";
import CustomText from "./CustomText";
import LinearGradient from "react-native-linear-gradient";
import colors from "../utils/color";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function SuscriptionButton({
  data,
  onPress,
}: SuscriptionButtonProps) {
  return (
    <LinearGradient
      colors={
        data.selected
          ? ["rgba(9, 128, 185, 0.5)", "#4E6AFF"]
          : ["rgba(9, 240, 185, 0.1)", "rgba(30, 108, 243, 0.1)"]
      }
      style={styles.container}
    >
      <Pressable onPress={onPress}>
        <Box flexDirection="row" justifyContent="space-between">
          <CustomText
            fontSize={16}
            lineHeight={19}
            color={data.selected ? colors.secondary : colors.textColor}
            fontFamily="Inter-Medium"
          >
            {data.title}
          </CustomText>
          <Icon
            name={data.selected ? "check-circle-outline" : "circle-outline"}
            color={colors.secondary}
            size={40}
          />
        </Box>

        <Box flexDirection="row" alignItems="center" mt={5}>
          <CustomText
            color={data.selected ? colors.secondary : colors.primary}
            fontSize={22}
            fontFamily="Inter-Bold"
            lineHeight={27}
          >
            {data.price}
          </CustomText>
          <CustomText
            color={data.selected ? colors.secondary : colors.primary}
            fontSize={16}
            fontFamily="Inter-Medium"
            lineHeight={19}
          >
            {data.per}
          </CustomText>
        </Box>

        {data.points.map((el, index) => {
          return (
            <Box
              key={index.toString()}
              mt={8}
              width={"75%"}
              flexDirection="row"
              alignItems="center"
            >
              <Icon
                name="check-circle-outline"
                size={20}
                color={data.selected ? colors.secondary : colors.appblack}
                style={{ marginRight: 5 }}
              />
              <CustomText
                color={data.selected ? colors.secondary : colors.appblack}
                fontSize={14}
                fontFamily="Inter-Medium"
                lineHeight={20}
              >
                {el}
              </CustomText>
            </Box>
          );
        })}
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 25,
    borderColor: "rgba(30, 108, 243, 0.2)",
    padding: 15,
  },
});
