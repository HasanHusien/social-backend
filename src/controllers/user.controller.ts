import type { RequestHandler } from "express";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { catchAsync } from "../utils/catchAsync.js";
import User from "../model/userModel.js";

export const getAllUsers: RequestHandler = catchAsync(
  async (_req, res, _next) => {
    const users = await User.find();

    res.status(HTTP_STATUS.OK).json({
      status: "success",
      result: users.length,
      data: {
        users,
      },
    });
  },
);
