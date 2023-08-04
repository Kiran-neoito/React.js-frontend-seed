export type LoginParams = {
  email: string;
  password: string;
};

export type ResetPasswordParams = {
  password: string;
  confirmPassword: string;
  token: string;
};
