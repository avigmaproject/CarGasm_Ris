import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { CardProps, PostedCardProps } from "../../../types/propTypes";
import Box from "../../../components/Box";
import CustomText from "../../../components/CustomText";
import colors from "../../../utils/color";
import {
  pixelSizeHorizontal,
  pixelSizeVertical,
} from "../../../utils/responsive";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { truncateString } from "../../../utils/helper";

export default function PostedCard({
  data,
  onPress,
  onPressDots,
}: PostedCardProps) {
  return (
    <Pressable style={styles.card} onPress={() => onPress(data.UP_PKeyID)}>
      <Box alignItems="center">
        <Image source={{ uri: data.UP_Poster_Img_Path }} style={styles.image} />
      </Box>
      <Box style={styles.textContain}>
        <CustomText
          fontSize={14}
          lineHeight={17}
          fontFamily="Inter-Medium"
          color={colors.textColor}
        >
          {data.User_Name}
        </CustomText>

        <Box flexDirection="row" alignItems="center" mt={5}>
          <Icon
            name="map-marker-outline"
            size={20}
            color={colors.appblack}
            style={{ right: 3 }}
          />
          <CustomText
            fontSize={12}
            lineHeight={18}
            fontFamily="Inter-Medium"
            color={colors.appblack}
          >
            {truncateString(data.UP_Location, 20)}
          </CustomText>
        </Box>

        <CustomText
          fontSize={14}
          lineHeight={17}
          fontFamily="Inter-SemiBold"
          color={colors.primary}
          style={{ marginTop: 5 }}
        >
          $112
        </CustomText>
      </Box>
      <Pressable
        style={styles.circle}
        onPress={() => onPressDots(data.UP_PKeyID)}
      >
        <Icon name="dots-vertical" size={20} color={colors.textColor} />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    backgroundColor: colors.secondary,
    height: pixelSizeVertical(140),
    marginTop: 10,
    borderColor: "#ECECEC",
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: pixelSizeVertical(120),
    width: pixelSizeHorizontal(120),
    borderRadius: 3,
    right: 20,
  },
  textContain: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    right: 15,
  },
  circle: {
    position: "absolute",
    padding: 8,
    backgroundColor: "#F0F1F4",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    right: 5,
    top: 10,
  },
});
