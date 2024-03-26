type GET_POSTED = "carGasm/getPostedItem";

type LIKED_ITEMS = {
  UP_PKeyID: number;
  LikeCount: number;
  Comments_Count: number;
  UP_Purchased_Count: number;
  Review_Count: number;
  Comment_IsEligible: number;
  FavCount: boolean;
  MyLike: boolean;
  UP_Shared_Count: boolean;
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
  UP_Web_URL: string;
  UP_Shipping_Cost: number;
  UP_Pro_IsDiscount: boolean;
  Product_Data: number;
  User_PkeyID: number;
  User_Name: string;
  User_Image_Path: string;
  User_Store_URL: string;
  User_Token_val: string;
  User_Firebase_UID: string;
  UP_Is_Highlight: boolean;
  UP_IsActive: boolean;
  UP_Category_ID: number;
  UP_Duration: number;
  UP_Address: string;
};

type GetLikedItemState = {
  called: boolean;
  error: boolean;
};

type GetPostedItemAction = {
  type: GET_POSTED;
  payload: GetPostedState;
};
