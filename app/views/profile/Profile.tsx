import { View, StyleSheet, Platform, Image, Pressable } from "react-native";
import React, { useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import { dummyProfileUrl } from "../../utils/constant";
import Header from "../../components/Header";
import Box from "../../components/Box";
import { pixelSizeHorizontal, pixelSizeVertical } from "../../utils/responsive";
import { ProfileProps } from "../../types/propTypes";
import Input from "../../components/Input";
import PrimaryButton from "../../components/PrimaryButton";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../utils/color";
import ActionSheet, {
  SheetManager,
  useSheetRef,
} from "react-native-actions-sheet";
import ImagePicker from "../../components/ImagePicker";

export default function Profile({ navigation }: ProfileProps) {
  const actionSheetRef = useSheetRef();
  const [selectedImage, setSelectedImage] = useState(dummyProfileUrl);

  function showActionSheet() {
    SheetManager.show("camera");
  }
  function onSaveImage(uploadedImages: ImageData[] | null) {
    if (uploadedImages) {
      setSelectedImage(uploadedImages[0].uri);
      SheetManager.hide("camera");
    }
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 1)"]}
    >
      <Box style={styles.header}>
        <Header
          back={false}
          title="My Profile"
          onPress={() => navigation.goBack()}
        />
      </Box>
      <Box alignItems="center" mt={20}>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 55,
            borderColor: "#677294",
          }}
        >
          <Pressable
            style={{
              borderWidth: 1,
              position: "absolute",
              borderRadius: 20,
              padding: 5,
              bottom: 0,
              right: 0,
              zIndex: 100,
              backgroundColor: colors.secondary,
              borderColor: colors.appblack,
            }}
            onPress={showActionSheet}
          >
            <Icon name="camera-outline" size={20} color={colors.appblack} />
          </Pressable>
          <Image
            source={{
              uri: selectedImage,
            }}
            style={{ height: 110, width: 110, borderRadius: 55 }}
          />
        </View>
      </Box>
      <Box ph={20} pv={20}>
        <Input label="User Name" />
        <Box mt={10}>
          <Input
            label="Bio"
            multiline={true}
            numberOfLines={4}
            input={{ height: 150, paddingTop: 20 }}
          />
        </Box>
      </Box>
      <Box style={styles.button}>
        <PrimaryButton label="Sell Item" onPress={() => alert("Thank You")} />
      </Box>
      <ActionSheet ref={actionSheetRef} id="camera" headerAlwaysVisible>
        <ImagePicker onSaveImage={onSaveImage} />
      </ActionSheet>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
  header: {
    marginTop:
      Platform.OS === "ios" ? pixelSizeVertical(50) : pixelSizeVertical(20),
    paddingHorizontal: pixelSizeHorizontal(20),
  },
  button: {
    paddingHorizontal: wp(5),
    marginTop: "auto",
    paddingBottom: hp(5),
  },
});
