type GET_CATEGORIES = "carGasm/getCategoriesList";

type Categories_Type = {
  CM_PkeyID: number;
  CM_Name: string;
  CM_Description: string;
  CM_ImgName: string;
  CM_ImgPath: string;
  CM_ImgPath1: boolean;
};

type GetCategoriesState = {
  called: boolean;
  error: boolean;
};

type GetCategoriesAction = {
  type: GET_CATEGORIES;
  payload: GetCategoriesState;
};
