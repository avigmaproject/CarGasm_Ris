import ImageCropPicker, { Options } from "react-native-image-crop-picker";
import { PERMISSIONS } from "react-native-permissions";
import { askMultipleAndroidPermissions } from "./helper";
import DocumentPicker, {
  DocumentPickerOptions,
} from "react-native-document-picker";

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

export const uploadMultipleDocuments = async (
  options: DocumentPickerOptions<"android" | "ios" | "windows">
) => {
  await askMultipleAndroidPermissions([
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.CAMERA,
  ]);
  try {
    const res = await DocumentPicker.pick({
      ...options,
      copyTo: "documentDirectory",
      allowMultiSelection: true,
    });

    return res;
  } catch (err: any) {
    if (!DocumentPicker.isCancel(err)) {
      throw err;
    }
  }
};

export const uploadDocument = async (
  options: DocumentPickerOptions<"android" | "ios" | "windows"> = {
    type: [DocumentPicker.types.images],
  }
) => {
  await askMultipleAndroidPermissions([
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.CAMERA,
  ]);
  try {
    const res = await DocumentPicker.pick({
      ...options,
      copyTo: "documentDirectory",
    });
    return res;
  } catch (err: any) {
    if (!DocumentPicker.isCancel(err)) {
      throw err;
    }
  }
};
