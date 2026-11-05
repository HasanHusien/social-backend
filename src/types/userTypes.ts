export interface IUser {
  name: string;
  email: string;
  photo: string;
  role: string;
  password: string;
  passwordConfirm: string | undefined;
  passwordChangedAt: Date | number;
  passwordResetToken: string;
  passwordResetExpires: Date;
  active: boolean;
}
