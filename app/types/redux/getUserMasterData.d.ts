type GET_USER_DATA = "carGasm/getusermasterdata";
type GET_USER_LIST = {
   type: number,
    user_PkeyID: number,
    user_PkeyID_Master:number,
    whereClause: string,
    pageNumber:number,
    noofRows:number,
    orderby:string,
    userID:number
};

type GetUserState = {
  called: boolean;
  error: boolean;
  data: GET_USER_LIST[][];
};

type GetUserAction = {
  type: GET_USER_DATA;
payload: GetUserState;
};
