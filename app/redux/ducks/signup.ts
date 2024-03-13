import { AxiosError } from "axios";
import axiosInstance from "../../axios";
import { LOGIN_SUBMIT } from "../../utils/api";
import { AppDispatch } from "../store";
import { handleError, postAuth } from "../../utils/helper";
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';

const SIGNUP: SIGNUP = "carGasm/signup";

const initialState: SignupState = {
  called: false,
  error: false,
  errorCode: "",
  userToken: "",
};

export default (state = initialState, action: SignupAction): SignupState => {
  switch (action.type) {
    case SIGNUP:
      return { ...state, ...action.payload };
    default:
      return { ...state, called: false };
  }
};

const signupAction = (res: SignupState): SignupAction => {
  return { type: SIGNUP, payload: { ...res, called: true } };
};

export const onRegister =
  (
    User_Email: string,
    User_Password: string,
    Type: number,
    User_Name: string,
    User_Phone: string,
 User_Token_val: string,
        User_Firebase_UID: string,
  ) =>
  async (dispatch: AppDispatch) => {
    const url = LOGIN_SUBMIT;

    let data = JSON.stringify({
      User_Email: User_Email,
      User_Password: User_Password,
      Type: Type,
      User_Name: User_Name,
      User_Phone: User_Phone,
      User_Token_val: User_Token_val,
      User_Firebase_UID: User_Firebase_UID,
    });

    axiosInstance
      .post(url, data)
      .then((res) => {
        dispatch(signupAction({ ...res.data, error: false }));
        if (res.data.userToken) {
          postAuth(res.data.userToken);
        }
      })
      .catch((error: AxiosError) => {
        handleError(error, dispatch);
        if (error.request._response) {
          dispatch(
            signupAction({
              ...JSON.parse(error.request._response),
              error: true,
              called: false,
            })
          );
        }
      });
  };
export const getFcmToken = async () => {

  await messaging().deleteToken();
  const fcmToken = await firebase.messaging().getToken();
  console.log('fcmToken', fcmToken);
  return fcmToken;

};
export const requestUserPermission = async () => {
  let authStatus = await firebase.messaging().hasPermission();
  if (
    authStatus !== firebase.messaging.AuthorizationStatus.AUTHORIZED ||
    messaging.AuthorizationStatus.PROVISIONAL
  ) {
    authStatus = await firebase.messaging().requestPermission();
  }
  if (authStatus === firebase.messaging.AuthorizationStatus.AUTHORIZED) {
    return authStatus;
  }
};