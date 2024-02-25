type LoginErrors = {
  email?: string;
  password?: string;
};

type SignupErrors = {
  name?: string;
  email?: string;
  password?: string;
  cpassword?: string;
  phone?: string;
};

type ResetPasswordErros = {
  password?: string;
  cpassword?: string;
};
