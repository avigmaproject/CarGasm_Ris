import { AxiosError } from "axios";
import axiosInstance from "../../axios";
import { AppDispatch } from "../store";
import { GET_CATEGORIES_API } from "../../utils/api";

const GET_CATEGORIES: GET_CATEGORIES = "carGasm/getCategoriesList";

const initialState: GetCategoriesState = {
  called: false,
  error: false,
};

export default (
  state = initialState,
  action: GetCategoriesAction
): GetCategoriesState => {
  switch (action.type) {
    case GET_CATEGORIES:
      return { ...state, ...action.payload };
    default:
      return { ...state, called: false };
  }
};

const getCategoriesAction = (res: GetCategoriesState): GetCategoriesAction => {
  return { type: GET_CATEGORIES, payload: { ...res, called: true } };
};

export const getCategoriesData =
  (
    CM_PkeyID: number,
    WhereClause: string,
    PageNumber: number,
    NoofRows: number,
    Orderby: string,
    Type: number,
    UserID: number
  ) =>
  async (dispatch: AppDispatch) => {
    const url = GET_CATEGORIES_API;

    let data = JSON.stringify({
      CM_PkeyID: CM_PkeyID,
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
        dispatch(getCategoriesAction({ ...res.data, error: false }));
      })
      .catch((error: AxiosError) => {
        if (error.request._response) {
          dispatch(
            getCategoriesAction({
              ...JSON.parse(error.request._response),
              error: true,
              called: false,
            })
          );
        }
      });
  };
