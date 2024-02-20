import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  Pressable,
  Platform,
} from "react-native";
import React, { useState } from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import Box from "../../components/Box";
import CustomText from "../../components/CustomText";
import { IntroProps } from "../../types/propTypes";
import Icon from "react-native-vector-icons/AntDesign";
import colors from "../../utils/color";
import GradientText from "../../components/GradientText";

const slides = [
  {
    key: 1,
    title: "What is GB button?",
    text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown .",
    image: require("../../assets/images/IntroImages/Intro1.png"),
    backgroundColor: "#59b2ab",
  },
  {
    key: 2,
    title: "What's the purpose of Q&A",
    text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown .",
    image: require("../../assets/images/IntroImages/Intro2.png"),
    backgroundColor: "#febe29",
  },
  {
    key: 3,
    title: "What is WTB ?",
    text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown .",
    image: require("../../assets/images/IntroImages/Intro3.png"),
    backgroundColor: "#22bcb5",
  },
];

export default function Intro({ navigation }: IntroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  function renderNextButton() {
    return (
      <Box style={styles.nextButton}>
        <Image
          source={
            currentIndex === 0
              ? require("../../assets/images/IntroImages/Circle.png")
              : require("../../assets/images/IntroImages/Circle2.png")
          }
          style={{ height: 60, width: 60, top: 30 }}
        />
      </Box>
    );
  }

  function renderDoneButton() {
    return (
      <Box style={styles.button}>
        <Icon name="arrowright" size={25} color={colors.secondary} />
      </Box>
    );
  }

  function renderItem({ item }: any) {
    return (
      <Box style={styles.slide}>
        <Image
          source={item.image}
          style={{ height: "70%", width: "100%" }}
          resizeMode="contain"
        />
        <CustomText
          fontFamily="Inter-Bold"
          color={"#333B4B"}
          fontSize={26}
          lineHeight={32}
        >
          {item.title}
        </CustomText>
        <CustomText
          color={"#8F8F8F"}
          fontFamily="Inter-Regular"
          fontSize={16}
          lineHeight={26}
          style={{ textAlign: "center", marginTop: 5 }}
        >
          {item.text}
        </CustomText>
      </Box>
    );
  }
  function onDone() {
    navigation.navigate("Welcome");
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        ph={15}
        pv={10}
        alignItems="center"
      >
        <Box>
          <GradientText style={styles.headerText}>
            Car<Text style={{ fontFamily: "Inter-Regular" }}>Gasm</Text>
          </GradientText>
        </Box>
        <Pressable onPress={onDone}>
          <CustomText
            color={"#8F8F8F"}
            fontSize={20}
            lineHeight={26}
            fontFamily="Inter-Regular"
          >
            Skip
          </CustomText>
        </Pressable>
      </Box>
      <AppIntroSlider
        renderItem={renderItem}
        data={slides}
        onDone={onDone}
        dotStyle={{ backgroundColor: "transparent" }}
        activeDotStyle={{ backgroundColor: "transparent" }}
        renderNextButton={renderNextButton}
        onSlideChange={(index, lastIndex) => setCurrentIndex(index)}
        renderDoneButton={renderDoneButton}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  slide: {
    alignItems: "center",
  },
  button: {
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    position: "absolute",
    right: 150,
    bottom: Platform.OS === "ios" ? 0 : -20,
  },
  nextButton: {
    position: "absolute",
    right: 150,
    bottom: Platform.OS === "ios" ? 30 : 10,
  },
  headerText: {
    fontSize: 36,
    lineHeight: 44,
    fontFamily: "Inter-Bold",
  },
});
