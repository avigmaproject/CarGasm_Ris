type LOGIN = "carGasm/login";

type LoginState = {
  called: boolean;
  error: boolean;
  errorCode: string;
  userToken: string;
};

type LoginAction = {
  type: LOGIN;
  payload: LoginState;
};
