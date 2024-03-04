type GET_HOME_DATA = "carGasm/getHomeData";

type HOME_LIST = {
  UP_PKeyID: number;
  UP_ImageName: string;
  UP_ImagePath: string;
  UP_IsFirst: boolean;
  UP_Number: number;
  UP_UserID: number;
  UP_Location: string;
  UP_latitude: string;
  UP_longitude: string;
  UP_Doc_Type: string;
  UP_Coll_Desc: string;
  UP_Title: string;
  UP_Tags: string;
  UP_Price: string;
  UP_Shop_Now: string;
  UP_Poster_Img_Name: string;
  UP_Poster_Img_Path: string;
  UP_IsActive: boolean;
  User_PkeyID: number;
  User_Name: string;
  User_Email: string;
  User_Image_Path: string;
};

type GetHomeDataState = {
  called: boolean;
  error: boolean;
  data: HOME_LIST[][];
};

type GetHomeDataAction = {
  type: GET_HOME_DATA;
  payload: GetHomeDataState;
};
