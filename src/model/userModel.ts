import { model } from "mongoose";
import { userSchema } from "../schema/userSchema.js";

const User = model("User", userSchema);

export default User;
