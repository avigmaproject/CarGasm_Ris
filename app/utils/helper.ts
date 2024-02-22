import Snackbar from "react-native-snackbar";
import { saveUserToken } from "./localStorage";
import { Log } from "../axios";
import { requestMultiple } from "react-native-permissions";
import { Permission } from "../types";

export const postAuth = async (token: string) => {
  await saveUserToken(token);
};

export const snackBar = (text: string, color: string, onPress?: () => void) => {
  Snackbar.show({
    text: text,
    duration: Snackbar.LENGTH_LONG,
    backgroundColor: color,
    fontFamily: "Inter-Medium",
    action: {
      text: "",
      textColor: color,
      onPress: () => Snackbar.dismiss(),
    },
  });
};

export const askMultipleAndroidPermissions = async (
  permissions: Permission[]
) => {
  try {
    const accepted = await requestMultiple([...permissions]);
    permissions.map((el) => Log(el, accepted[el]));
  } catch (error: any) {
    Log("Permissions", error, "ERROR");
  }
};
