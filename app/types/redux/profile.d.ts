type UPDATE_PROFILE = "carGasm/updateProfile";

type UpdateProfileState = {
  called: boolean;
  error: boolean;
};

type UpdateProfileAction = {
  type: UPDATE_PROFILE;
  payload: UpdateProfileState;
};
