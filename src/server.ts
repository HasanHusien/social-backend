import mongoose from "mongoose";
import app from "./app.js";
const port = process.env.PORT || 8000;

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception!, Shutting down....");
  console.log(err.name, err.message);
  process.exit(1);
});

mongoose
  .connect(process.env.MONGODB_URI!, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("✅ Database connected successfully");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const server = app.listen(port, () => {
  console.log(`🚀 Server running On 127.0.0.1:${port}/api`);
});

process.on("unhandledRejection", (err: any) => {
  console.log("Unhandled Rejection!, Shutting down....");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
