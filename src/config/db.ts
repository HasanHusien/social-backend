import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDB = async (): Promise<void> => {
  await mongoose.connect(env.mongoUrl, {
    serverSelectionTimeoutMS: 5000,
  });
  console.log("✅ Database connected successfully");
};
