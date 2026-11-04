import express from "express";
import userRouter from "./routes/userRoutes.js";
import morgan from "morgan";
const app = express();

if (process.env.ENVIRONMENT === "development") {
  app.use(morgan("dev"));
}

app.use("/api", userRouter);
export default app;
