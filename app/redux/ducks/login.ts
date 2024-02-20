import { AxiosError } from "axios";
import axiosInstance from "../../axios";
import { LOGIN_SUBMIT } from "../../utils/api";
import { saveUserToken } from "../../utils/localStorage";
import { AppDispatch } from "../store";

const LOGIN: LOGIN = "carGasm/login";

const initialState: LoginState = {
  called: false,
  error: false,
  errorCode: "",
  userToken: "",
};

export default (state = initialState, action: LoginAction): LoginState => {
  switch (action.type) {
    case LOGIN:
      return { ...state, ...action.payload };
    default:
      return { ...state, called: false };
  }
};

const loginAction = (res: LoginState): LoginAction => {
  return { type: LOGIN, payload: { ...res, called: true } };
};

export const onLogin =
  (User_Email: string, User_Password: string, Type: number) =>
  async (dispatch: AppDispatch) => {
    const url = LOGIN_SUBMIT;

    let data = JSON.stringify({
      User_Email: User_Email,
      User_Password: User_Password,
      Type: Type,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axiosInstance
      .post(url, data, config)
      .then((res) => {
        dispatch(loginAction({ ...res.data, error: false }));
        if (res.data) {
          console.log("res", res.data);
        }
      })
      .catch((error: AxiosError) => {
        if (error.request._response) {
          dispatch(
            loginAction({
              ...JSON.parse(error.request._response),
              error: true,
            })
          );
        }
      });
  };
