import { AxiosError } from "axios";
import axiosInstance from "../../axios";
import { AppDispatch } from "../store";
import { GET_HOME_DATA_API, UPDAT_USER_PROFILE } from "../../utils/api";

const GET_HOME_DATA: GET_HOME_DATA = "carGasm/getHomeData";

const initialState: GetHomeDataState = {
  called: false,
  error: false,
  data: [],
};

export default (
  state = initialState,
  action: GetHomeDataAction
): GetHomeDataState => {
  switch (action.type) {
    case GET_HOME_DATA:
      return { ...state, ...action.payload };
    default:
      return { ...state, called: false };
  }
};

const getHomeDataAction = (res: GetHomeDataState): GetHomeDataAction => {
  return { type: GET_HOME_DATA, payload: { ...res, called: true } };
};

export const getHomeDataList =
  (
    type: number,
    user_PkeyID: number,
    whereClause: string,
    pageNumber: number,
    noofRows: number,
    orderby: string,
    userID: number
  ) =>
  async (dispatch: AppDispatch) => {
    const url = GET_HOME_DATA_API;

    let data = JSON.stringify({
      type: type,
      user_PkeyID: user_PkeyID,
      whereClause: whereClause,
      pageNumber: pageNumber,
      noofRows: noofRows,
      orderby: orderby,
      userID: userID,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axiosInstance
      .post(url, data)
      .then((res) => {
        dispatch(getHomeDataAction({ ...res.data, error: false }));
      })
      .catch((error: AxiosError) => {
        if (error.request._response) {
          dispatch(
            getHomeDataAction({
              ...JSON.parse(error.request._response),
              error: true,
              called: false,
            })
          );
        }
      });
  };
