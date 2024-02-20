import { StyleSheet, Text, Animated } from "react-native";
import React, { useEffect, useRef } from "react";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SplashProps } from "../../types/propTypes";
import Box from "../../components/Box";
import CustomText from "../../components/CustomText";
import LinearGradient from "react-native-linear-gradient";

export default function Splash({ navigation }: SplashProps) {
  const translateX = useRef(new Animated.Value(-wp("65%"))).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: 0, // Move the image to the center
      duration: 2000, // Adjust the duration as needed
      useNativeDriver: false,
    }).start(() => {
      // Animation completed, navigate to the next screen
      navigation.navigate("Intro");
    });
  }, [navigation, translateX]);

  return (
    <LinearGradient colors={["#09F0B9", "#4E6AFF"]} style={styles.container}>
      <Box mt={5}>
        <Animated.Image
          source={require("../../assets/images/Splash.png")}
          style={[
            styles.image,
            {
              transform: [{ translateX: translateX }],
            },
          ]}
        />
      </Box>
      <CustomText
        fontFamily="Inter-Bold"
        fontSize={44}
        lineHeight={54}
        color="White"
        style={styles.title}
      >
        Car<Text style={{ fontFamily: "Inter-Regular" }}>Gasm</Text>
      </CustomText>
      <Box mt={60}>
        <Animated.Image
          source={require("../../assets/images/Splash.png")}
          style={[
            styles.image,
            {
              transform: [{ translateX: translateX }],
            },
          ]}
        />
      </Box>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  image: { width: wp("65%"), height: hp("32%") },
  content: { alignItems: "center", justifyContent: "center" },
  title: { top: 30 },
});