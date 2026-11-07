import mongoose from "mongoose";
import app from "./app.js";
import { env } from "./config/env.js";

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception!, Shutting down....");
  console.log(err.name, err.message);
  process.exit(1);
});

mongoose
  .connect(process.env.MONGODB_URI!, {
    dbName:"social-network",
    serverSelectionTimeoutMS: 5000
  })
  .then(() => {
    console.log("✅ Database connected successfully");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const server = app.listen(env.port, () => {
  console.log(`🚀 Server running On 127.0.0.1:${env.port}/api`);
});

process.on("unhandledRejection", (err: any) => {
  console.log("Unhandled Rejection!, Shutting down....");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
