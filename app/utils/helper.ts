import Snackbar from "react-native-snackbar";
import { deleteUserToken, saveUserToken } from "./localStorage";
import { Log, cancelRequest } from "../axios";
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

export const handleError = (error: any, dispatch: any) => {
  if (error?.request?._response) {
    const urlParts = error.request._url.split("/");
    const endpoint =
      urlParts?.includes("login") || urlParts?.includes("getOtp");

    if (!endpoint && error.request.status === 401) {
      // Logout user
      cancelRequest("Not Authorized");
      console.log("401, ", error.request);
      deleteUserToken();
      // dispatch(onLogout());
    } else {
      const err = JSON.parse(error.request._response);

      const { errors } = err;
      // This will show all the errors

      if (errors) {
        let concatErr = "";
        switch (typeof errors) {
          case "string":
            concatErr = errors;

            break;
          case "object":
            concatErr = "";
            Object.keys(errors).map((key, index) => {
              if (index !== 0) {
                concatErr += "\n";
              }
              concatErr += `${errors[key]}`;
            });
            break;
        }

        Snackbar.show({
          text: concatErr,
          backgroundColor: "red",
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
  } else if (error?.message) {
    Snackbar.show({
      text: error.message,
      backgroundColor: "red",
      duration: Snackbar.LENGTH_SHORT,
    });
  }
};
