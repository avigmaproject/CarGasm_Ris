import { Image, Pressable, SafeAreaView, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import TabHeader from "./component/TabHeader";
import Icon from "react-native-vector-icons/Ionicons";
import Mate from "react-native-vector-icons/MaterialCommunityIcons";
import Box from "../../components/Box";
import colors from "../../utils/color";
import CustomText from "../../components/CustomText";
import { pixelSizeVertical } from "../../utils/responsive";

import ImagePicker from "../../components/ImagePicker";
import { uploaddocumnetaws } from "../../utils/awsFile";
import Loader from "../../components/Loader";
import PrimaryButton from "../../components/PrimaryButton";
import { UploadImageProps } from "../../types/propTypes";
import { ProductContext } from "../../contexts/ProductTabContext";
import { snackBar } from "../../utils/helper";
import Modal from "react-native-modalbox";

export default function UploadImage({ navigation }: UploadImageProps) {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<ImageData[]>([]);
  const { productImage, setProductImage } = useContext(ProductContext);
  const [isPickerModalOpen, setIsPickerModalOpen] = useState(false);
  const [viewImage, setViewImage] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);

  function showModal() {
    setIsPickerModalOpen(true);
  }

  function onClosePickerModal() {
    setIsPickerModalOpen(false);
  }

  async function onSaveImage(images: ImageData[] | null) {
    if (images) {
      setLoading(true);
      const responses = [];
      const tempImp: any[] = [];

      for (const image of images) {
        try {
          const response = await uploaddocumnetaws(image);
          responses.push({
            UI_PKeyID: 0,
            UI_Name: "string",
            UI_File_Name: image.name,
            UI_File_Path: response.location,
            UI_File_Type: "image",
          });
          tempImp.push(image); // Pushing image into tempImp array
        } catch (error) {
          console.error("Error uploading image:", error);
          // Handle error if needed
        }
      }

      setProductImage(responses);
      setImages(tempImp);
      setLoading(false);
    }
  }

  function onRemoveImage(index: number) {
    const prevFiles = images.filter((_, idx) => index !== idx);
    const prevProductImage = productImage.filter((_, idx) => index !== idx);
    setImages(prevFiles);
    setProductImage(prevProductImage);
  }
  function onView(image: string) {
    setViewImage(image);
    setShowImageModal(true);
  }

  const onNext = () => {
    if (productImage.length === 0) {
      snackBar("Upload Product Image", "red");
    } else {
      navigation.navigate("Payment");
    }
  };

  const onClosedModal = () => {
    setShowImageModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TabHeader title={"Post Product"} back cancel={false} />
      {loading && <Loader />}

      {images.length === 0 ? (
        <>
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
          <Pressable style={styles.box} onPress={showModal}>
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
          </Pressable>
        </>
      ) : (
        <Box mt={20}>
          {images.map((el, index) => {
            return (
              <Box key={index.toString()} style={styles.selectedImage}>
                <CustomText
                  color={colors.primary}
                  fontFamily="Inter-Medium"
                  fontSize={14}
                  lineHeight={20}
                  style={{ width: "75%", textAlign: "center" }}
                >
                  {el.name}
                </CustomText>
                <Box flexDirection="row">
                  <Pressable
                    style={{ right: 15 }}
                    onPress={() => onView(el.uri)}
                  >
                    <Mate name="eye" size={20} color={colors.primary} />
                  </Pressable>
                  <Pressable
                    style={{ right: 5 }}
                    onPress={() => onRemoveImage(index)}
                  >
                    <Mate name="delete" size={20} color={"red"} />
                  </Pressable>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
      <Box style={styles.button}>
        <PrimaryButton label="Next" onPress={onNext} />
      </Box>
      <ImagePicker
        multiple={true}
        title="Select Document"
        isOpen={isPickerModalOpen}
        onClose={onClosePickerModal}
        onSaveImage={onSaveImage}
      />
      <Modal isOpen={showImageModal} onClosed={onClosedModal} coverScreen>
        <Box>
          <Pressable
            style={{
              right: 20,
              top: 50,
              position: "absolute",
              zIndex: 100,
            }}
            onPress={onClosedModal}
          >
            <Icon size={35} color={"#000000"} name="close" />
          </Pressable>
          <Image
            source={{ uri: viewImage }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        </Box>
      </Modal>
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
  selectedImage: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    backgroundColor: colors.lightPrimary,
    borderColor: colors.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
