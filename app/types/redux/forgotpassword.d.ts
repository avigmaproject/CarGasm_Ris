type FORGOT_PASSWORD = "carGasm/forgotPassword";

type ForgotPasswordState = {
  called: boolean;
  error: boolean;
  userCode: string;
  errorCode: string;
  emailID: string;
  type: number | null;
  device: number | null;
  email_Url: string;
  user_PkeyID: number | null;
  userID: number | null;
};

type ForgotPasswordAction = {
  type: FORGOT_PASSWORD;
  payload: ForgotPasswordState[];
};
