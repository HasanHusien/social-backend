import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception!, Shutting down....");
  console.log(err.name, err.message);
  process.exit(1);
});

// for get __dirname with ES
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "./config/.env") });

import app from "./app.js";
const port = process.env.PORT;

mongoose
  .connect(process.env.MONGODB_URI!, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("DB Connected Successfully...."))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const server = app.listen(() => {
  console.log(`Running On Port ${port}`, `127.0.0.1:${port}/api`);
});

process.on("unhandledRejection", (err: any) => {
  console.log("Unhandled Rejection!, Shutting down....");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
