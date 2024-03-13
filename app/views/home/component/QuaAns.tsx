import { View, Text, Image, StyleSheet, Pressable } from "react-native"
import React from "react"
import { QAProps } from "../../../types/propTypes"
import Box from "../../../components/Box"
import CustomText from "../../../components/CustomText"
import colors from "../../../utils/color"
import {
  pixelSizeHorizontal,
  pixelSizeVertical
} from "../../../utils/responsive"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { truncateString } from "../../../utils/helper"

export default function QuaAns({ data }: QAProps) {
  return (
    <Box>
      <Box flexDirection="row" alignItems="center" mt={10}>
        <CustomText
          fontFamily="Inter-Regular"
          fontSize={16}
          color={colors.textColor}
          lineHeight={22}
        >
          Q:- {data.no}
        </CustomText>
        <CustomText
          fontFamily="Inter-SemiBold"
          fontSize={16}
          color={colors.textColor}
          lineHeight={22}
        >
          {data.que}
        </CustomText>
      </Box>
      <Box>
        <CustomText
          fontFamily="Inter-Regular"
          fontSize={16}
          color={colors.textColor}
          lineHeight={22}
        >
          Ans:-{" "}
        </CustomText>
        <CustomText
          fontFamily="Inter-SemiBold"
          fontSize={16}
          color={colors.textColor}
          lineHeight={22}
        >
          {data.ans}
        </CustomText>
      </Box>
    </Box>
  )
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    backgroundColor: colors.secondary,
    height: pixelSizeVertical(200),
    width: pixelSizeHorizontal(160),
    marginTop: 10,
    borderColor: "#ECECEC",
    borderRadius: 6
  },
  image: {
    height: pixelSizeVertical(100),
    width: pixelSizeHorizontal(140),
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    marginTop: 5
  },
  heart: { position: "absolute", right: 15, top: 10 },
  wave: {
    position: "absolute",
    left: 15,
    top: 10,
    backgroundColor: colors.secondary,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 16
  }
})
