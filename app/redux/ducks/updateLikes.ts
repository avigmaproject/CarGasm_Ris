import { AxiosError } from "axios";
import axiosInstance from "../../axios";
import { CREATE_USER_LIKE_DATA, LOGIN_SUBMIT } from "../../utils/api";
import { AppDispatch } from "../store";
import { handleError, postAuth } from "../../utils/helper";
import { getUserToken } from "../../utils/localStorage";

const UPDATE_LIKES: UPDATE_LIKES = "carGasm/updateLikes";

const initialState: UpdateLikesState = {
  called: false,
  error: false,
};

export default (
  state = initialState,
  action: UpdateLikesAction
): UpdateLikesState => {
  switch (action.type) {
    case UPDATE_LIKES:
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
};

const updateLikesAction = (res: UpdateLikesState): UpdateLikesAction => {
  return { type: UPDATE_LIKES, payload: { ...res, called: true } };
};

export const onUpdateLike =
  (
    UL_PKeyID: number,
    UL_Name: string,
    UL_UP_PKeyID: number,
    UL_User_PkeyID: number,
    UL_IsActive: boolean,
    UL_IsDelete: boolean,
    Type: number,
    UserID: number
  ) =>
  async (dispatch: AppDispatch) => {
    const url = CREATE_USER_LIKE_DATA;

    const token = await getUserToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let body = JSON.stringify({
      UL_PKeyID: UL_PKeyID,
      UL_Name: UL_Name,
      UL_UP_PKeyID: UL_UP_PKeyID,
      UL_User_PkeyID: UL_User_PkeyID,
      UL_IsActive: UL_IsActive,
      UL_IsDelete: UL_IsDelete,
      Type: Type,
      UserID: UserID,
    });

    axiosInstance
      .post(url, body, config)
      .then((res) => {
        dispatch(updateLikesAction({ ...res.data, error: false }));
      })
      .catch((error: AxiosError) => {
        handleError(error, dispatch);
        if (error.request._response) {
          dispatch(
            updateLikesAction({
              ...JSON.parse(error.request._response),
              error: true,
              called: false,
            })
          );
        }
      });
  };
