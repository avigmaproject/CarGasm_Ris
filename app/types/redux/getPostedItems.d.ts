type GET_POSTED = "carGasm/getPostedItem";

type POSTED_ITEMS = {
  UP_PKeyID: number;
  LikeCount: number;
  Comments_Count: number;
  UP_Purchased_Count: number;
  Review_Count: number;
  FavCount: boolean;
  MyLike: boolean;
  UP_ImageName: string;
  UP_ImagePath: string;
  UP_IsFirst: boolean;
  UP_Number: number;
  UP_UserID: number;
  UP_Location: string;
  UP_latitude: string;
  UP_longitude: string;
  UP_Doc_Type: string;
  UP_Poster_Img_Name: string;
  UP_Poster_Img_Path: string;
  Product_Data: number;
  User_Name: string;
  User_Image_Path: string;
  UP_IsActive: boolean;
};

type GetPostedItemState = {
  called: boolean;
  error: boolean;
};

type GetPostedItemAction = {
  type: GET_POSTED;
  payload: GetPostedState;
};
