import { View, Text, SafeAreaView, StyleSheet, Image } from "react-native";
import React, { useContext } from "react";
import TabHeader from "./component/TabHeader";
import { ProductContext } from "../../contexts/ProductTabContext";
import Box from "../../components/Box";
import { pixelSizeVertical } from "../../utils/responsive";
import CustomText from "../../components/CustomText";
import colors from "../../utils/color";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PrimaryButton from "../../components/PrimaryButton";

export default function Payment() {
  const {
    brand,
    title,
    productImage,
    description,
    location,
    condition,
    price,
  } = useContext(ProductContext);
  return (
    <SafeAreaView style={styles.container}>
      <TabHeader title={"Post Product"} back cancel={false} />
      <Box ph={20} pv={20}>
        <Image source={{ uri: productImage }} style={styles.image} />
        <Box pv={20}>
          <CustomText
            fontFamily="Inter-SemiBold"
            fontSize={20}
            color={colors.textColor}
            lineHeight={24}
          >
            {brand}
          </CustomText>
          <CustomText
            fontFamily="Inter-Regular"
            fontSize={16}
            color={colors.textColor}
            lineHeight={22}
            style={{ marginTop: 10 }}
          >
            {description}
          </CustomText>
          <Box flexDirection="row" alignItems="center" mt={10}>
            <Icon
              name="map-marker-outline"
              size={25}
              color={colors.appblack}
              style={{ right: 3 }}
            />

            <CustomText
              fontFamily="Inter-Regular"
              fontSize={12}
              color={colors.textColor}
              lineHeight={18}
            >
              {location}
            </CustomText>
          </Box>
          <Box flexDirection="row" alignItems="center" mt={10}>
            <CustomText
              fontFamily="Inter-Regular"
              fontSize={16}
              color={colors.textColor}
              lineHeight={22}
            >
              Conditon:{" "}
            </CustomText>
            <CustomText
              fontFamily="Inter-SemiBold"
              fontSize={16}
              color={colors.textColor}
              lineHeight={22}
            >
              {condition}
            </CustomText>
          </Box>
          <Box flexDirection="row" alignItems="center" mt={10}>
            <CustomText
              fontFamily="Inter-Regular"
              fontSize={16}
              color={colors.textColor}
              lineHeight={22}
            >
              Price:{" "}
            </CustomText>
            <CustomText
              fontFamily="Inter-Bold"
              fontSize={16}
              color={colors.primary}
              lineHeight={22}
            >
              ${Number(price).toFixed(2)}
            </CustomText>
          </Box>
        </Box>
      </Box>
      <Box style={styles.button}>
        <PrimaryButton label="Post" />
      </Box>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: "#F4F4F4",
  },
  image: {
    height: pixelSizeVertical(200),
    width: "100%",
    borderRadius: 8,
  },
  button: {
    marginTop: "auto",
    marginBottom: 50,
    paddingHorizontal: 20,
  },
});
