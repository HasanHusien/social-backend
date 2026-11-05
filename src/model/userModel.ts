import { model, Schema, Query } from "mongoose";
import { isEmail } from "validator";
import type { IUser } from "../types/userTypes.js";
import bcrypt from "bcryptjs";

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

  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// before saving encrypt password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

userSchema.pre("save", function () {
  if (!this.isModified("password") || this.isNew) return;

  this.passwordChangedAt = Date.now() - 1000;
});

// soft delete fn called before any query called find()
userSchema.pre(/^find/, function (this: Query<any, any>) {
  this.find({ active: { $ne: false } });
});

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = model("User", userSchema);

export default User;
