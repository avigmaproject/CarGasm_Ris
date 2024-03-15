import { View, Text, Image, StyleSheet, Pressable } from "react-native"
import React from "react"
import { QAProps } from "../../../types/propTypes"
import Box from "../../../components/Box"
import CustomText from "../../../components/CustomText"
import colors from "../../../utils/color"


export default function QuaAns({ data }: QAProps) {
  return (
    <Box>
      <Box flexDirection="row" alignItems="center" mt={10}>
        <CustomText
          fontFamily="Inter-SemiBold"
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
      <Box flexDirection="row" alignItems="center" mt={10}>
        <CustomText
          fontFamily="Inter-Regular"
          fontSize={16}
          color={colors.textColor}
          lineHeight={22}
        >
          Ans:-{" "}
        </CustomText>
        <CustomText
          fontFamily="Inter-Regular"
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


