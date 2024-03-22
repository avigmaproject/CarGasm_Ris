import { AxiosError } from "axios"
import axiosInstance from "../../axios"
import { AppDispatch } from "../store"
import { handleError, postAuth } from "../../utils/helper"
import { getUserToken } from "../../utils/localStorage"
import { GET_USER_MASTER_DATA } from "../../utils/api"

const GET_USER_DATA: GET_USER_DATA = "carGasm/getusermasterdata"

const initialState: GetUserState = {
  called: false,
  error: false,
  data: []
}

export default (state = initialState, action: GetUserAction): GetUserState => {
  switch (action.type) {
    case GET_USER_DATA:
      return { ...state, ...action.payload }
    default:
      return { ...state, called: false }
  }
}

const getUserAction = (res: GetUserState): GetUserAction => {
  return { type: GET_USER_DATA, payload: { ...res, called: true } }
}

export const getUserMasterList =
  (
    type: number,
    user_PkeyID: number,
    user_PkeyID_Master: number,
    whereClause: string,
    pageNumber: number,
    noofRows: number,
    orderby: string,
    userID: number
  ) =>
  async (dispatch: AppDispatch) => {
    const url = GET_USER_MASTER_DATA

    const token = await getUserToken()

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    let body = JSON.stringify({
      type: type,
      user_PkeyID: user_PkeyID,
      user_PkeyID_Master: user_PkeyID_Master,
      whereClause: whereClause,
      pageNumber: pageNumber,
      noofRows: noofRows,
      orderby: orderby,
      userID: userID
    })
    console.log("dataaaaa", body)
    axiosInstance
      .post(url, body, config)

      .then((res) => {
        dispatch(getUserAction({ ...res.data, error: false }))
      })
      .catch((error: AxiosError) => {
        handleError(error, dispatch)
        if (error.request._response) {
          dispatch(
            getUserAction({
              ...JSON.parse(error.request._response),
              error: true,
              called: false
            })
          )
        }
      })
  }
