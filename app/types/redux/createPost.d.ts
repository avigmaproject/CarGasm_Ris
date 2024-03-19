type CREATE_POST_DATA = "carGasm/createPost";

type CreatePostState = {
  called: boolean;
  error: boolean;
};

type CreatePostAction = {
  type: CREATE_POST_DATA;
  payload: CreatePostState;
};
