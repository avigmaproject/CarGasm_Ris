type GET_SUB_CATEGORIES = "carGasm/getSubCategoriesList";

type GetSubCategoriesState = {
  called: boolean;
  error: boolean;
};

type GetSubCategoriesAction = {
  type: GET_SUB_CATEGORIES;
  payload: GetSubCategoriesState;
};
