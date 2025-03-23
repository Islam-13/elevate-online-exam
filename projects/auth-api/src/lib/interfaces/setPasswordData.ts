export interface SetPassword {
  email: string;
  newPassword: string;
}

export interface SetPasswordRes {
  message: string;
  token: string;
}
