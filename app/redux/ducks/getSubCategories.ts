import { AxiosError } from "axios";
import axiosInstance from "../../axios";
import { AppDispatch } from "../store";
import { GET_SUB_CATEGORIES_API } from "../../utils/api";

const GET_SUB_CATEGORIES: GET_SUB_CATEGORIES = "carGasm/getSubCategoriesList";

const initialState: GetSubCategoriesState = {
  called: false,
  error: false,
};

export default (
  state = initialState,
  action: GetSubCategoriesAction
): GetSubCategoriesState => {
  switch (action.type) {
    case GET_SUB_CATEGORIES:
      return { ...state, ...action.payload };
    default:
      return { ...state, called: false };
  }
};

const getSubCategoriesAction = (
  res: GetSubCategoriesState
): GetSubCategoriesAction => {
  return { type: GET_SUB_CATEGORIES, payload: { ...res, called: true } };
};

export const getCategoriesData =
  (
    SCM_PkeyID: number,
    WhereClause: string,
    PageNumber: number,
    NoofRows: number,
    Orderby: string,
    Type: number,
    UserID: number
  ) =>
  async (dispatch: AppDispatch) => {
    const url = GET_SUB_CATEGORIES_API;

    let data = JSON.stringify({
      SCM_PkeyID: SCM_PkeyID,
      WhereClause: WhereClause,
      PageNumber: PageNumber,
      NoofRows: NoofRows,
      Orderby: Orderby,
      Type: Type,
      UserID: UserID,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axiosInstance
      .post(url, data, config)
      .then((res) => {
        dispatch(getSubCategoriesAction({ ...res.data, error: false }));
      })
      .catch((error: AxiosError) => {
        if (error.request._response) {
          dispatch(
            getSubCategoriesAction({
              ...JSON.parse(error.request._response),
              error: true,
              called: false,
            })
          );
        }
      });
  };
