import { View, Text, SafeAreaView, StyleSheet, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import TabHeader from "./component/TabHeader";
import { ProductContext } from "../../contexts/ProductTabContext";
import Box from "../../components/Box";
import { pixelSizeVertical } from "../../utils/responsive";
import CustomText from "../../components/CustomText";
import colors from "../../utils/color";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PrimaryButton from "../../components/PrimaryButton";
import { useDispatch } from "react-redux";
import { onCreatePostData } from "../../redux/ducks/createPost";
import { useAppSelector } from "../../utils/hooks";
import { snackBar } from "../../utils/helper";
import { PaymentProps } from "../../types/propTypes";

export default function Payment({ navigation }: PaymentProps) {
  const dispatch = useDispatch<any>();
  const {
    brand,
    title,
    productImage,
    description,
    location,
    condition,
    price,
    categ,
    subCateg,
  } = useContext(ProductContext);
  const selectPostProduct = useAppSelector((state) => state.createPost);

  const postProduct = () => {
    dispatch(
      onCreatePostData(
        0,
        "string",
        0,
        "string",
        true,
        0,
        0,
        true,
        false,
        1,
        0,
        "string",
        description,
        true,
        location,
        "string",
        "string",
        "string",
        title,
        "string",
        price,
        "string",
        true,
        "Poster",
        "Path",
        15.88,
        "PName",
        price,
        "Address",
        "",
        "",
        "",
        categ,
        subCateg,
        condition,
        brand,
        productImage
      )
    );
  };

  useEffect(() => {
    if (selectPostProduct.called) {
      const { error } = selectPostProduct;
      if (!error) {
        snackBar("Product Created Successfully", "green");
        navigation.navigate("Home");
      }
    }
  }, [selectPostProduct]);

  return (
    <SafeAreaView style={styles.container}>
      <TabHeader title={"Post Product"} back cancel={false} />
      <Box ph={20} pv={20}>
        <Image
          source={{ uri: productImage[0].UI_File_Path }}
          style={styles.image}
        />
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
        <PrimaryButton label="Post" onPress={postProduct} />
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
