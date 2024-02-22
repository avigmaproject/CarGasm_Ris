import SInfo from "react-native-sensitive-info";
import { TOKEN, IS_FIRST_TIME } from "./constant";

export function saveUserToken(token: string): Promise<null> {
  return SInfo.setItem(TOKEN, token, {
    sharedPreferencesName: "my_shared_prefs",
    keychainService: "my_keychain",
  });
}

export function getUserToken(): Promise<string> {
  return SInfo.getItem(TOKEN, {
    sharedPreferencesName: "my_shared_prefs",
    keychainService: "my_keychain",
  });
}

export function deleteUserToken(): Promise<null> {
  return SInfo.deleteItem(TOKEN, {
    sharedPreferencesName: "my_shared_prefs",
    keychainService: "my_keychain",
  });
}

export function saveIsFirstTime(): Promise<null> {
  return SInfo.setItem(IS_FIRST_TIME, "true", {});
}

export function getIsFirstTime(): Promise<string | null> {
  return SInfo.getItem(IS_FIRST_TIME, {});
}
