type SIGNUP = "carGasm/signup";

type SignupState = {
  called: boolean;
  error: boolean;
  errorCode: string;
  userToken: string;
};

type SignupAction = {
  type: SIGNUP;
  payload: SignupState;
};
