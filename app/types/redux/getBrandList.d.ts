type GET_BRAND = "carGasm/getBrandList";

type Brand_Type = {
  BM_PkeyID: number;
  BM_Name: string;
  BM_Description: string;
  BM_ImgName: string;
  BM_ImgPath: string;
  BM_ImgPath1: boolean;
};

type GetBrandState = {
  called: boolean;
  error: boolean;
};

type GetBrandAction = {
  type: GET_BRAND;
  payload: GetBrandState;
};
