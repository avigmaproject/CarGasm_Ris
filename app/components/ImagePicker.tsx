import { View, Text, Pressable, Platform, StyleSheet } from "react-native";
import React, { useRef } from "react";
import { snackBar } from "../utils/helper";
import {
  extractExtFromName,
  extractFileNameFromUri,
  openPicker,
  uploadDocument,
  uploadMultipleDocuments,
} from "../utils/imagePickerHelper";
import { ImagePickerProps } from "../types/propTypes";
import colors from "../utils/color";
import Box from "./Box";
import CustomText from "./CustomText";
import Modal from "react-native-modalbox";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DocumentPicker from "react-native-document-picker";

export default function ImagePicker(props: ImagePickerProps) {
  const modalRef = useRef<Modal>(null);

  const {
    isOpen,
    onClose,
    multiple,
    onSaveImage,
    fileTypes = {
      type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
    },
    size = 10000000,
    position = "bottom",
  } = props;

  const options = [
    {
      title: "Camera",
      icon: "camera",
      onPress: () => openGalleryOrCamera(true, false),
    },
    {
      title: "Folder",
      icon: "folder",
      onPress: () => openGalleryOrCamera(false, false),
    },
  ];

  const iosOptions = [
    {
      title: "Camera",
      icon: "camera",
      onPress: () => openGalleryOrCamera(true, false),
    },
    {
      title: "Folder",
      icon: "folder",
      onPress: () => openGalleryOrCamera(false, false),
    },
    {
      title: "Upload",
      icon: "upload",
      onPress: () => openGalleryOrCamera(false, true),
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

  function showError(error: string) {
    snackBar(error, "red");
  }

  async function openGalleryOrCamera(
    camera: boolean = false,
    ios: boolean = false
  ) {
    let result: ImageData[] = [];
    try {
      let res: any = null;
      let fileError: string | undefined;

      if (camera || ios) {
        res = await openPicker(camera, false, multiple, false);

        if (res) {
          if (
            !validatateExtension(
              res.filename || extractFileNameFromUri(res.path)
            )
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
      } else {
        res = await (multiple
          ? uploadMultipleDocuments(fileTypes)
          : uploadDocument(fileTypes));

        if (res) {
          // If documents are multiple
          if (Array.isArray(res)) {
            res.map(async (el) => {
              el.fileCopyUri =
                (Platform.OS === "android" ? "file://" : "") + el.fileCopyUri;
              if (!validatateExtension(el.name || res.filename)) {
                fileError = "File type is invalid";
              } else if (
                extractExtFromName(
                  el.name || res.filename || extractFileNameFromUri(el.path)
                ) === "svg"
              ) {
                fileError = "SVG is not valid file type!";
              } else if (
                extractExtFromName(
                  el.name || res.filename || extractFileNameFromUri(el.path)
                ) === "mp4"
              ) {
                fileError = "Mp4 is not valid file type!";
              } else if (
                extractExtFromName(
                  el.name || res.filename || extractFileNameFromUri(el.path)
                ) === "mp3"
              ) {
                fileError = "Mp3 is not valid file type!";
              } else if (
                extractExtFromName(
                  el.name || res.filename || extractFileNameFromUri(el.path)
                ) === "gif"
              ) {
                fileError = "Gif is not valid file type!";
              } else if (el.size > size) {
                // File should not be greater than 10MB
                // 10MB = 1,00,00,000 Bytes
                fileError = "File size cannot be more than 10 MB";
              } else {
                result.push({
                  name: el.name || extractFileNameFromUri(el.fileCopyUri),
                  size: el.size || 0,
                  type: el.type || "",
                  uri: el.fileCopyUri,
                });
              }
            });
          } else {
            if (!validatateExtension(extractExtFromName(res.filename))) {
              fileError = "File type is invalid";
            } else if (extractExtFromName(res.filename)) {
              fileError = "SVG is not valid file type!";
            } else if (res.size <= size) {
              // File should not be greater than 10MB
              // 10MB = 1,00,00,000 Bytes

              res.fileCopyUri = "file://" + res.fileCopyUri;
              result.push({
                name: res.name || extractFileNameFromUri(res.fileCopyUri),
                size: res.size,
                type: res.type,
                uri: res.fileCopyUri,
              });
            } else {
              fileError = "File size cannot be more than 10 MB";
            }
          }

          fileError && showError(fileError);
        }
      }
    } catch (error) {
    } finally {
      onSaveImage(result);
      modalRef.current?.close();
    }
  }

  return (
    <Modal
      backButtonClose={true}
      ref={modalRef}
      swipeToClose={false}
      backdrop={true}
      position={position}
      isOpen={isOpen}
      onClosed={onClose}
      style={styles.container}
      coverScreen={true}
    >
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
    </Modal>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: "center",
    borderRadius: 45,
    padding: 5,
    backgroundColor: colors.lightPrimary,
  },
  container: {
    height: "auto",
    backgroundColor: "#FFFFFF",
    shadowRadius: 5,
    shadowColor: "rgba(0, 0, 0, 0.16)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    paddingVertical: 15,
  },
});
