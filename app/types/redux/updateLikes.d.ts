type UPDATE_LIKES = "carGasm/updateLikes";

type UpdateLikesState = {
  called: boolean;
  error: boolean;
};

type UpdateLikesAction = {
  type: UPDATE_LIKES;
  payload: UpdateLikesState;
};
