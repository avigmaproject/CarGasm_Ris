import { AxiosError } from "axios";
import axiosInstance from "../../axios";
import { AppDispatch } from "../store";
import { handleError, postAuth } from "../../utils/helper";
import { getUserToken } from "../../utils/localStorage";
import { CREATE_USER_POST_DATA } from "../../utils/api";

const CREATE_POST_DATA: CREATE_POST_DATA = "carGasm/createPost";

const initialState: CreatePostState = {
  called: false,
  error: false,
};

export default (
  state = initialState,
  action: CreatePostAction
): CreatePostState => {
  switch (action.type) {
    case CREATE_POST_DATA:
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
};

const createPostAction = (res: CreatePostState): CreatePostAction => {
  return { type: CREATE_POST_DATA, payload: { ...res, called: true } };
};

export const onCreatePostData =
  (
    UP_PKeyID: number,
    UP_ImageName: string,
    UP_Size: number,
    UP_ImagePath: string,
    UP_IsFirst: boolean,
    UP_Number: number,
    UP_UserID: number,
    UP_IsActive: boolean,
    UP_IsDelete: boolean,
    Type: number,
    UserID: number,
    UP_Product_URL: string,
    UP_Coll_Desc: string,
    UP_IsAdmin: boolean,
    UP_Location: string,
    UP_latitude: string,
    UP_longitude: string,
    UP_Doc_Type: string,
    UP_Title: string,
    UP_Tags: string,
    UP_Price: string,
    UP_Promo_Code: string,
    UP_Shop_Now: boolean,
    UP_Poster_Img_Name: string,
    UP_Poster_Img_Path: string,
    UP_Duration: number,
    UP_Product_Name: string,
    UP_Product_Price: number,
    UP_Address: string,
    UP_Web_URL: string,
    UP_No_Stripe_PriceID: string,
    UP_No_Stripe_ProductID: string,
    UP_CM_PkeyID: number,
    UP_SCM_PkeyID: number,
    UP_Condition: string,
    UP_Brand: string,
    User_Image_Post_DTO: {
      UI_PKeyID: number;
      UI_Name: string;
      UI_File_Name: string;
      UI_File_Path: string;
      UI_File_Type: string;
    }
  ) =>
  async (dispatch: AppDispatch) => {
    const url = CREATE_USER_POST_DATA;

    const token = await getUserToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let body = JSON.stringify({
      UP_PKeyID: UP_PKeyID,
      UP_ImageName: UP_ImageName,
      UP_Size: UP_Size,
      UP_ImagePath: UP_ImagePath,
      UP_IsFirst: UP_IsFirst,
      UP_Number: UP_Number,
      UP_UserID: UP_UserID,
      UP_IsActive: UP_IsActive,
      UP_IsDelete: UP_IsDelete,
      Type: Type,
      UserID: UserID,
      UP_Product_URL: UP_Product_URL,
      UP_Coll_Desc: UP_Coll_Desc,
      UP_IsAdmin: UP_IsAdmin,
      UP_Location: UP_Location,
      UP_latitude: UP_latitude,
      UP_longitude: UP_longitude,
      UP_Doc_Type: UP_Doc_Type,
      UP_Title: UP_Title,
      UP_Tags: UP_Tags,
      UP_Price: UP_Price,
      UP_Promo_Code: UP_Promo_Code,
      UP_Shop_Now: UP_Shop_Now,
      UP_Poster_Img_Name: UP_Poster_Img_Name,
      UP_Poster_Img_Path: UP_Poster_Img_Path,
      UP_Duration: UP_Duration,
      UP_Product_Name: UP_Product_Name,
      UP_Product_Price: UP_Product_Price,
      UP_Address: UP_Address,
      UP_Web_URL: UP_Web_URL,
      UP_No_Stripe_PriceID: UP_No_Stripe_PriceID,
      UP_No_Stripe_ProductID: UP_No_Stripe_ProductID,
      UP_CM_PkeyID: UP_CM_PkeyID,
      UP_SCM_PkeyID: UP_SCM_PkeyID,
      UP_Condition: UP_Condition,
      UP_Brand: UP_Brand,
      // User_Image_Post_DTO:
    });

    axiosInstance
      .post(url, body, config)
      .then((res) => {
        dispatch(createPostAction({ ...res.data, error: false }));
      })
      .catch((error: AxiosError) => {
        handleError(error, dispatch);
        if (error.request._response) {
          dispatch(
            createPostAction({
              ...JSON.parse(error.request._response),
              error: true,
              called: false,
            })
          );
        }
      });
  };
