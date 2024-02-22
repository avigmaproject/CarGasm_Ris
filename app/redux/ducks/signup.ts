import { AxiosError } from "axios";
import axiosInstance from "../../axios";
import { LOGIN_SUBMIT } from "../../utils/api";
import { AppDispatch } from "../store";
import { postAuth } from "../../utils/helper";

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
    User_Phone: string
  ) =>
  async (dispatch: AppDispatch) => {
    const url = LOGIN_SUBMIT;

    let data = JSON.stringify({
      User_Email: User_Email,
      User_Password: User_Password,
      Type: Type,
      User_Name: User_Name,
      User_Phone: User_Phone,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axiosInstance
      .post(url, data, config)
      .then((res) => {
        dispatch(signupAction({ ...res.data, error: false }));
        if (res.data.userToken) {
          postAuth(res.data.userToken);
        }
      })
      .catch((error: AxiosError) => {
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
