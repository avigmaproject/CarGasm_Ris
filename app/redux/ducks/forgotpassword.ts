import { AxiosError } from "axios";
import axiosInstance from "../../axios";
import { AppDispatch } from "../store";
import { handleError, postAuth } from "../../utils/helper";
import { PASSWORD_FORGOT } from "../../utils/api";

const FORGOT_PASSWORD: FORGOT_PASSWORD = "carGasm/forgotPassword";

const initialState: ForgotPasswordState = {
  called: false,
  error: false,
  errorCode: "",
  device: null,
  email_Url: "",
  emailID: "",
  type: null,
  user_PkeyID: null,
  userCode: "",
  userID: null,
};

export default (
  state = initialState,
  action: ForgotPasswordAction
): ForgotPasswordState => {
  switch (action.type) {
    case FORGOT_PASSWORD:
      return { ...state, ...action.payload, called: true };
    default:
      return { ...state, called: false };
  }
};

const forgotPasswordAction = (
  res: ForgotPasswordState
): ForgotPasswordAction => {
  return { type: FORGOT_PASSWORD, payload: { ...res } };
};

export const onForgotPassword =
  (EmailID: string, Type: number, Device: number, Email_Url: string) =>
  async (dispatch: AppDispatch) => {
    const url = PASSWORD_FORGOT;

    let data = JSON.stringify({
      EmailID: EmailID,
      Type: Type,
      Device: Device,
      Email_Url: Email_Url,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axiosInstance
      .post(url, data, config)
      .then((res) => {
        dispatch(forgotPasswordAction({ ...res.data, error: false }));
        if (res.data.userToken) {
          postAuth(res.data.userToken);
        }
      })
      .catch((error: AxiosError) => {
        handleError(error, dispatch);
        if (error.request._response) {
          dispatch(
            forgotPasswordAction({
              ...JSON.parse(error.request._response),
              error: true,
              called: false,
            })
          );
        }
      });
  };
