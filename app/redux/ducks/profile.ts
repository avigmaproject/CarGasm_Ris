import { AxiosError } from "axios";
import axiosInstance from "../../axios";
import { AppDispatch } from "../store";
import { UPDAT_USER_PROFILE } from "../../utils/api";

const UPDATE_PROFILE: UPDATE_PROFILE = "carGasm/updateProfile";

const initialState: UpdateProfileState = {
  called: false,
  error: false,
};

export default (
  state = initialState,
  action: UpdateProfileAction
): UpdateProfileState => {
  switch (action.type) {
    case UPDATE_PROFILE:
      return { ...state, ...action.payload };
    default:
      return { ...state, called: false };
  }
};

const updateProfileAction = (res: UpdateProfileState): UpdateProfileAction => {
  return { type: UPDATE_PROFILE, payload: { ...res, called: true } };
};

export const updateProfile =
  (
    User_Email: string,
    User_Password: string,
    Type: number,
    User_Image_Path: string,
    User_Bio: string,
    User_Image_Name: string,
    User_Name: string
  ) =>
  async (dispatch: AppDispatch) => {
    const url = UPDAT_USER_PROFILE;

    let data = JSON.stringify({
      User_Email: User_Email,
      User_Password: User_Password,
      Type: Type,
    });

    let profileData = JSON.stringify({
      Type: Type,
      User_Image_Path: User_Image_Path,
      User_Bio: User_Bio,
      User_Image_Name: User_Image_Name,
      User_Name: User_Name,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axiosInstance
      .post(url, Type === 2 ? profileData : data, config)
      .then((res) => {
        dispatch(updateProfileAction({ ...res.data, error: false }));
      })
      .catch((error: AxiosError) => {
        if (error.request._response) {
          dispatch(
            updateProfileAction({
              ...JSON.parse(error.request._response),
              error: true,
              called: false,
            })
          );
        }
      });
  };
