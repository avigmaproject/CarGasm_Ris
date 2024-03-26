import { View, Text, Image, StyleSheet, Pressable } from "react-native"
import React from "react"
import { CardProps, PostedCardProps } from "../../../types/propTypes"
import Box from "../../../components/Box"
import CustomText from "../../../components/CustomText"
import colors from "../../../utils/color"
import {
  pixelSizeHorizontal,
  pixelSizeVertical
} from "../../../utils/responsive"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { truncateString } from "../../../utils/helper"

export default function LikedItemsCard({ data }: PostedCardProps) {
  return (
    <Pressable style={styles.card}>
      <Box alignItems="center">
        <Image source={{ uri: data.UP_Poster_Img_Path }} style={styles.image} />
      </Box>
      <Box ph={10} pv={10}>
        <CustomText
          fontSize={14}
          lineHeight={17}
          fontFamily="Inter-Medium"
          color={colors.textColor}
        >
          {data.UP_Title}
        </CustomText>
        <Box flexDirection="row" alignItems="center" mt={5}>
          <Icon
            name="map-marker-outline"
            size={15}
            color={colors.appblack}
            style={{ right: 3 }}
          />
          <CustomText
            fontSize={12}
            lineHeight={18}
            fontFamily="Inter-Medium"
            color={colors.appblack}
          >
            {truncateString(data.UP_Location, 14)}
          </CustomText>
        </Box>

        <CustomText
          fontSize={14}
          lineHeight={17}
          fontFamily="Inter-SemiBold"
          color={colors.primary}
          style={{ marginTop: 5 }}
        >
          ${data.UP_Price}
        </CustomText>
      </Box>

      <Pressable
        style={styles.heart}
        // onPress={() => onPressLike(data.UP_PKeyID, data.UP_UserID)}
      >
        <Icon name="heart-outline" color={colors.secondary} size={25} />
      </Pressable>
    </Pressable>
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
