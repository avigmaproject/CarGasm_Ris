import {
  View,
  StyleSheet,
  Platform,
  Image,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
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
import GlobalContext from "../../contexts/GlobalContext";
import { deleteUserToken, getUserToken } from "../../utils/localStorage";
import { uploaddocumnetaws } from "../../utils/awsFile";
import Loader from "../../components/Loader";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux/ducks/profile";
import { useAppSelector } from "../../utils/hooks";
import { snackBar } from "../../utils/helper";
import { isNameValid } from "../../utils/regex";
import Label from "../../components/Label";

export default function Profile({ navigation }: ProfileProps) {
  const actionSheetRef = useSheetRef();
  const { setFromLogin, globalUserName } = useContext(GlobalContext);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch<any>();
  const [imageName, setImageName] = useState("");
  const [nameError, setNameError] = useState("");
  const selectUpdateProfile = useAppSelector((state) => state.profile);
  // const userToken = getUserToken();

  useEffect(() => {
    setName(globalUserName);
  }, []);

  function showActionSheet() {
    SheetManager.show("camera");
  }
  async function onSaveImage(uploadedImages: ImageData[] | null) {
    if (uploadedImages) {
      setLoading(true);
      setImageName(uploadedImages[0].name);
      const res = await uploaddocumnetaws(uploadedImages[0]);
      setSelectedImage(res.location);
      SheetManager.hide("camera");
      setLoading(false);
    }
  }

  function onSellItem() {
    if (name.length !== 0 && isNameValid(name)) {
      setLoading(true);
      dispatch(updateProfile("", "", 2, selectedImage, bio, imageName, name));
      setName("");
    } else {
      setNameError("Name is required");
    }
  }

  useEffect(() => {
    if (selectUpdateProfile.called) {
      setLoading(false);
      const { error } = selectUpdateProfile;
      if (!error) {
        snackBar("Profile Updated successfully", "green");
        // setFromLogin(true);
        navigation.navigate("Subscription");
      }
    }
  }, [selectUpdateProfile]);

  return (
    <LinearGradient
      style={styles.container}
      colors={["#FFFEF8", "rgba(255, 255, 255, 1)"]}
    >
      {loading && <Loader />}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <Box ph={20} pv={20}>
            <Header back={false} title="Profile" />
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
                  uri:
                    selectedImage.length !== 0
                      ? selectedImage
                      : dummyProfileUrl,
                }}
                style={{ height: 110, width: 110, borderRadius: 55 }}
              />
            </View>
          </Box>
          <Box ph={20} pv={20}>
            <Input
              label="User Name"
              value={name}
              onChangeText={setName}
              error={nameError}
            />

            <Box mt={10}>
              <Input
                label="Bio"
                multiline={true}
                numberOfLines={4}
                input={{ height: 150, paddingTop: 20 }}
                value={bio}
                onChangeText={setBio}
              />
            </Box>
          </Box>
          <Box style={styles.button}>
            <PrimaryButton label="Sell Item" onPress={onSellItem} />
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
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
    marginTop: 100,
    paddingBottom: hp(5),
  },
});
