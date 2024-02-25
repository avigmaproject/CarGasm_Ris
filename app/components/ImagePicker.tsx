import { View, Text, Pressable, Platform, StyleSheet } from "react-native";
import React from "react";
import { snackBar } from "../utils/helper";
import {
  extractExtFromName,
  extractFileNameFromUri,
  openPicker,
} from "../utils/imagePickerHelper";
import { ImagePickerProps } from "../types/propTypes";
import colors from "../utils/color";
import Box from "./Box";
import CustomText from "./CustomText";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ImagePicker({ onSaveImage }: ImagePickerProps) {
  const size = 10000000;
  const options = [
    {
      title: "Camera",
      icon: "camera",
      onPress: () => openGalleryOrCamera(true),
    },
    {
      title: "Folder",
      icon: "folder",
      onPress: () => openGalleryOrCamera(false),
    },
  ];

  const iosOptions = [
    {
      title: "Camera",
      icon: "camera",
      onPress: () => openGalleryOrCamera(true),
    },
    {
      title: "Folder",
      icon: "folder",
      onPress: () => openGalleryOrCamera(false),
    },
    {
      title: "Upload",
      icon: "upload",
      onPress: () => openGalleryOrCamera(false),
    },
  ];

  function validatateExtension(name: string) {
    const exts = name.match(/\.(.+)$/);
    if (exts && exts.length > 0) {
      const ext = exts[1];
      // Reject if ext still contain a dot (which is implemented as part of the double extension prevention)
      if (ext.indexOf(".") !== -1) {
        return false;
      }
      return true;
    }
    return true;
  }

  async function openGalleryOrCamera(camera: boolean = false) {
    let result: ImageData[] = [];
    try {
      let res: any = null;
      let fileError: string | undefined;
      res = await openPicker(camera, false, false);

      if (res) {
        if (
          !validatateExtension(res.filename || extractFileNameFromUri(res.path))
        ) {
          fileError = "File type is invalid";
        } else if (
          extractExtFromName(
            res.filename || extractFileNameFromUri(res.path)
          ) === "svg"
        ) {
          fileError = "SVG is not valid file type!";
        } else if (res.size > size) {
          // File should not be greater than 10MB
          // 10MB = 1,00,00,000 Bytes
          fileError = "File size cannot be more than 10 MB";
        } else {
          result.push({
            name: res.filename || extractFileNameFromUri(res.path),
            size: res.size,
            type: res.mime,
            uri: res.path,
          });
        }
      }
    } catch (error) {
    } finally {
      onSaveImage(result);
    }
  }

  return (
    <Box
      flexDirection="row"
      justifyContent={
        Platform.OS === "android" ? "space-around" : "space-between"
      }
    >
      {(Platform.OS === "android" ? options : iosOptions).map((el, index) => {
        return (
          <Pressable
            key={index.toString()}
            style={{
              paddingHorizontal: 40,
              paddingVertical: 20,
              flexDirection: "row",
            }}
            onPress={el.onPress}
          >
            <Box alignItems="center">
              <Box style={styles.circle}>
                <Icon name={el.icon} size={30} color={colors.primary} />
              </Box>
              <CustomText
                fontFamily="Inter-Medium"
                fontSize={16}
                color={colors.primary}
                style={{ marginTop: 10 }}
              >
                {el.title}
              </CustomText>
            </Box>
          </Pressable>
        );
      })}
    </Box>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: "center",
    borderRadius: 45,
    padding: 5,
    backgroundColor: colors.lightPrimary,
  },
});
