import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";

import AppError from "../utils/appError.js";
import jwt, { type JwtPayload } from "jsonwebtoken";
import User from "../model/userModel.js";

interface TokenPayload extends JwtPayload {
  id: string;
}

// Get the token from the Authorization header or the cookie
const extractToken = (req: Request): string | undefined => {
  const auth = req.headers.authorization;

  if (auth?.startsWith("Bearer ")) return auth.split(" ")[1];
  return req.cookies?.jwt;
};

const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token = extractToken(req);

    if (!token) {
      return next(new AppError("You are not logged in. Please log in.", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(
        new AppError("The user belonging to this token no longer exists.", 401),
      );
    }

    // decoded.iat is token creating time && jwt.sign adds iat automatically
    if (decoded.iat && user.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError(
          "Password was changed recently. Please log in again.",
          401,
        ),
      );
    }
    req.user = user;

    next();
  },
);

export { protect };
