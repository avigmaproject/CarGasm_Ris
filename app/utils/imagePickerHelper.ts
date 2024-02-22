import ImageCropPicker, { Options } from "react-native-image-crop-picker";
import { PERMISSIONS } from "react-native-permissions";
import { askMultipleAndroidPermissions } from "./helper";

export const extractFileNameFromUri = (uri: string) => {
  const uriArr = uri.split("/");
  return uriArr[uriArr.length - 1];
};

export const extractExtFromName = (name: string) => {
  const uriArr = name.split(".");
  return uriArr[uriArr.length - 1];
};

export const openPicker = async (
  camera = false,
  includeBase64 = true,
  multiple = false,
  cropping = false
) => {
  await askMultipleAndroidPermissions([
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.CAMERA,
  ]);
  const config: Options = {
    width: 400,
    height: 400,
    cropping,
    includeBase64,
    mediaType: "photo",
    freeStyleCropEnabled: true,
    compressImageMaxHeight: 400,
    compressImageMaxWidth: 400,
    cropperCircleOverlay: false,
    multiple,
  };
  let result = null;
  try {
    if (!camera) {
      result = await ImageCropPicker.openPicker({
        cropping: true,
        multiple: false,
      });
    } else {
      result = await ImageCropPicker.openCamera(config);
    }
  } catch (error: any) {
    result = null;
  }
  return result;
};
