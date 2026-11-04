import express from "express";
import userRouter from "./routes/userRoutes.js";
import morgan from "morgan";
import errorHandler from "./controllers/errorController.js";
import AppError from "./utils/appError.js";

import type { NextFunction, Response, Request } from "express";

const app = express();
app.use(express.json());

if (process.env.ENVIRONMENT === "development") {
  app.use(morgan("dev"));
}

app.use((req: Request, res: Response, next: NextFunction) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server`, 404),
  );
});
app.use("/api", userRouter);
app.use(errorHandler);

export default app;
