import React, { useState } from 'react';
import { View, StyleSheet, Platform, Image, Pressable, ScrollView, KeyboardAvoidingView ,SafeAreaView} from 'react-native';

import Box from '../../components/Box';

import PrimaryButton from '../../components/PrimaryButton';

import ActionSheet, { SheetManager, useSheetRef } from 'react-native-actions-sheet';
import ImagePicker from '../../components/ImagePicker';
import Loader from '../../components/Loader';
import { useDispatch } from 'react-redux';

import { uploaddocumnetaws } from "../../utils/awsFile";
import TabHeader from "./component/TabHeader"

const UploadImage: React.FC<{ navigation: any }> = ({ navigation }) => {
  const actionSheetRef = useSheetRef();

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [imageName, setImageName] = useState<string>('');

  const dispatch = useDispatch();

  function showActionSheet() {
    SheetManager.show('camera');
  }

  async function onSaveImage(uploadedImages: ImageData[] | null) {
    if (uploadedImages) {
      setLoading(true);
      setImageName(uploadedImages[0].name);
      const res = await uploaddocumnetaws(uploadedImages[0]);
      setSelectedImage(res.location);
      SheetManager.hide('camera');
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TabHeader title="Post Product" back />
      {loading && <Loader />}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView keyboardShouldPersistTaps="handled" style={{paddingHorizontal:20}}>
          <Box  mt={20}>
            <View
              style={{
                borderWidth: 1,
                   borderColor: "rgba(103, 114, 148, 0.16)",
                justifyContent: 'center',
                alignItems: 'center',
              }}>
{selectedImage.length == 0 ?
              <Pressable onPress={showActionSheet}>
                <Image source={require('../../assets/images/Uploadimage.png')} style={{ height: 190, width: 300 }} />
              </Pressable>:
              <Image
                source={{
                  uri:  selectedImage ,
                }}
                style={{ height: 160, width: 250 }}
              />
}
            </View>
          </Box>

          <Box style={styles.button}>
            <PrimaryButton label="Sell Item" />
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
      <ActionSheet ref={actionSheetRef} id="camera" headerAlwaysVisible>
        <ImagePicker onSaveImage={onSaveImage} />
      </ActionSheet>
</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
  header: {
    // marginTop: Platform.OS === 'ios' ? pixelSizeVertical(50) : pixelSizeVertical(20),
    // paddingHorizontal: pixelSizeHorizontal(20),
  },
  button: {
    // paddingHorizontal: wp(5),
    // marginTop: 100,
    // paddingBottom: hp(5),
  },
});

export default UploadImage;
