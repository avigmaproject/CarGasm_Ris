import { AxiosError } from "axios";
import axiosInstance from "../../axios";
import { AppDispatch } from "../store";
import { GET_POSTED_ITEMS } from "../../utils/api";
import { getUserToken } from "../../utils/localStorage";

const GET_POSTED: GET_POSTED = "carGasm/getPostedItem";

const initialState: GetPostedItemState = {
  called: false,
  error: false,
};

export default (
  state = initialState,
  action: GetPostedItemAction
): GetPostedItemState => {
  switch (action.type) {
    case GET_POSTED:
      return { ...state, ...action.payload };
    default:
      return { ...state, called: false };
  }
};

const getPostedItemAction = (res: GetPostedItemState): GetPostedItemAction => {
  return { type: GET_POSTED, payload: { ...res, called: true } };
};

export const getPostedItemsList =
  (
    Type: number,
    UP_PkeyID: number,
    UP_UserID: number,
    WhereClause: string,
    PageNumber: number,
    NoofRows: number,
    Orderby: string,
    UserID: number
  ) =>
  async (dispatch: AppDispatch) => {
    const url = GET_POSTED_ITEMS;

    let data = JSON.stringify({
      Type: Type,
      UP_PkeyID: UP_PkeyID,
      UP_UserID: UP_UserID,
      WhereClause: WhereClause,
      PageNumber: PageNumber,
      NoofRows: NoofRows,
      Orderby: Orderby,
      UserID: UserID,
    });

    const token = await getUserToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    axiosInstance
      .post(url, data, config)
      .then((res) => {
        dispatch(getPostedItemAction({ ...res.data, error: false }));
      })
      .catch((error: AxiosError) => {
        if (error.request._response) {
          dispatch(
            getPostedItemAction({
              ...JSON.parse(error.request._response),
              error: true,
              called: false,
            })
          );
        }
      });
  };
