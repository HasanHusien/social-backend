import { Model } from "mongoose";

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

export interface IUserMethods {
  correctPassword(
    candidatePassword: string,
    userPassword: string,
  ): Promise<boolean>;
  changedPasswordAfter(JWTTimestamp: number): boolean;
}

export type UserModel = Model<IUser, {}, IUserMethods>;
