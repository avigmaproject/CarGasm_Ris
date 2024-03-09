import { Image, Pressable, SafeAreaView, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import TabHeader from "./component/TabHeader";
import Icon from "react-native-vector-icons/Ionicons";
import Box from "../../components/Box";
import colors from "../../utils/color";
import CustomText from "../../components/CustomText";
import { pixelSizeVertical } from "../../utils/responsive";
import ActionSheet, {
  SheetManager,
  useSheetRef,
} from "react-native-actions-sheet";
import ImagePicker from "../../components/ImagePicker";
import { uploaddocumnetaws } from "../../utils/awsFile";
import Loader from "../../components/Loader";
import PrimaryButton from "../../components/PrimaryButton";
import { UploadImageProps } from "../../types/propTypes";
import { ProductContext } from "../../contexts/ProductTabContext";
import { snackBar } from "../../utils/helper";

export default function UploadImage({ navigation }: UploadImageProps) {
  const actionSheetRef = useSheetRef();

  const [loading, setLoading] = useState(false);
  const [imageName, setImageName] = useState("");
  const { productImage, setProductImage } = useContext(ProductContext);

  function showActionSheet() {
    SheetManager.show("camera");
  }
  async function onSaveImage(uploadedImages: ImageData[] | null) {
    if (uploadedImages) {
      setLoading(true);
      setImageName(uploadedImages[0].name);
      const res = await uploaddocumnetaws(uploadedImages[0]);

      setProductImage(res.location);
      SheetManager.hide("camera");
      setLoading(false);
    }
  }

  const onNext = () => {
    if (productImage.length === 0) {
      snackBar("Upload Product Image", "red");
    } else {
      navigation.navigate("Payment");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TabHeader title={"Post Product"} back cancel={false} />

      <Box ph={20} mt={20}>
        <CustomText
          fontFamily="Inter-Medium"
          fontSize={14}
          lineHeight={17}
          color={colors.appblack}
        >
          Upload Image
        </CustomText>
      </Box>
      <Pressable style={styles.box} onPress={showActionSheet}>
        {loading && <Loader />}
        {!productImage ? (
          <>
            <Icon name="image-outline" size={50} color={colors.primary} />
            <CustomText
              fontFamily="Inter-Regular"
              fontSize={14}
              lineHeight={17}
              color={colors.primary}
              style={{ textDecorationLine: "underline", marginTop: 10 }}
            >
              Capture or Browse image from gallery
            </CustomText>
          </>
        ) : (
          <Image source={{ uri: productImage }} style={styles.image} />
        )}
      </Pressable>
      <Box style={styles.button}>
        <PrimaryButton label="Next" onPress={onNext} />
      </Box>
      <ActionSheet ref={actionSheetRef} id="camera" headerAlwaysVisible>
        <ImagePicker onSaveImage={onSaveImage} />
      </ActionSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: "#F4F4F4",
  },
  box: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: pixelSizeVertical(200),
    marginHorizontal: 20,
    marginVertical: 10,
  },
  image: {
    height: pixelSizeVertical(200),
    width: "100%",
    borderRadius: 8,
  },
  button: {
    marginTop: "auto",
    paddingHorizontal: 20,
    marginBottom: 50,
  },
});
