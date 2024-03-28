import React from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";

import CustomText from "./CustomText";
import colors from "../utils/color";
import LinearGradient from "react-native-linear-gradient";
import Box from "./Box";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type TopTabsProps = {
  tabs: { title: string; onPress: () => void; icon: string }[];
  activeIndex: number;
};

const { width } = Dimensions.get("screen");

export default function TopTabs({ tabs, activeIndex }: TopTabsProps) {
  return (
    <LinearGradient
      colors={["rgba(9, 128, 185, 0.5)", "#4E6AFF"]}
      style={styles.row}
    >
      {tabs.map((el, idx) => {
        return (
          <View key={idx} style={styles.tab}>
            <Pressable
              key={idx}
              onPress={el.onPress}
              style={[styles.touchable, idx === activeIndex && styles.selected]}
            >
              <Icon
                name={el.icon}
                size={25}
                color={
                  idx === activeIndex ? colors.textColor : colors.secondary
                }
                style={{ right: 5 }}
              />
              <CustomText
                color={
                  idx === activeIndex ? colors.textColor : colors.secondary
                }
                fontFamily={"Poppins-SemiBold"}
                fontSize={15}
                style={{ top: 2 }}
              >
                {el.title}
              </CustomText>
            </Pressable>
          </View>
        );
      })}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    position: "relative",
    marginTop: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  tab: {
    width: "50%",
  },
  touchable: {
    padding: 10,
    justifyContent: "center",
    flexDirection: "row",
  },
  lineContainer: {
    width: "50%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
  },
  line: {
    width: width / 2,
    backgroundColor: colors.primary,
    height: 3,
  },
  selected: {
    backgroundColor: colors.secondary,
    marginRight: 5,
    borderRadius: 8,
  },
});
