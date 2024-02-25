type RESET_PASSWORD_ACTION = "carGasm/resetPassword";

type ResetPasswordState = {
  called: boolean;
  error: boolean;
};

type LoginAction = {
  type: RESET_PASSWORD_ACTION;
  payload: ResetPasswordState;
};
