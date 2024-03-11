type GET_CATEGORIES = "carGasm/getCategoriesList";

type GetCategoriesState = {
  called: boolean;
  error: boolean;
};

type GetCategoriesAction = {
  type: GET_CATEGORIES;
  payload: GetCategoriesState;
};
