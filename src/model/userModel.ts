import { Schema, model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique:[true,'Email should be unique'],
    lowercase:true,
    
  },
});

const User = model("User", userSchema);

export default User;
