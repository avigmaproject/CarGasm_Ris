import { AxiosError } from "axios";
import axiosInstance from "../../axios";
import { AppDispatch } from "../store";
import { GET_BRAND_DATA } from "../../utils/api";

const GET_BRAND: GET_BRAND = "carGasm/getBrandList";

const initialState: GetBrandState = {
  called: false,
  error: false,
};

export default (
  state = initialState,
  action: GetBrandAction
): GetBrandState => {
  switch (action.type) {
    case GET_BRAND:
      return { ...state, ...action.payload };
    default:
      return { ...state, called: false };
  }
};

const getBrandAction = (res: GetBrandState): GetBrandAction => {
  return { type: GET_BRAND, payload: { ...res, called: true } };
};

export const getBrandsData =
  (
    BM_PkeyID: number,
    WhereClause: string,
    PageNumber: number,
    NoofRows: number,
    Orderby: string,
    Type: number,
    UserID: number
  ) =>
  async (dispatch: AppDispatch) => {
    const url = GET_BRAND_DATA;

    let data = JSON.stringify({
      BM_PkeyID: BM_PkeyID,
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
        dispatch(getBrandAction({ ...res.data, error: false }));
      })
      .catch((error: AxiosError) => {
        if (error.request._response) {
          dispatch(
            getBrandAction({
              ...JSON.parse(error.request._response),
              error: true,
              called: false,
            })
          );
        }
      });
  };
