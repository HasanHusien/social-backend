import { Schema } from "mongoose";
import { isEmail } from "validator";

export interface IUser {
  name: string;
  email: string;
  photo: string;
  role: string;
  password: string;
  passwordConfirm: string;
  passwordChangedAt: Date;
  passwordResetToken: string;
  passwordResetExpires: Date;
}

export const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email should be unique"],
    lowercase: true,
    validate: [isEmail, "Please provide a valid email"],
  },
  photo: {
    type: String,
    default: "default.png",
  },
  role: {
    type: String,
    enum: ["user", "guid", "admin"],
    default: "user",
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Min length for password is 8"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "please confirm your password"],
    validate: {
      validator: function (this: any, el: string): boolean {
        return el === this.password;
      },
      message: "password confirm is failed",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});
