import type { Response } from "express";
import jwt from "jsonwebtoken";

const signToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (
  user: any,
  statusCode: number,
  res: Response,
): void => {
  const convertToDays = 24 * 60 * 60 * 1000;
  const token = signToken(user._id);

  const cookieExpiresIn = new Date(
    Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN ?? 7) * convertToDays,
  );

  res.cookie("jwt", token, {
    expires: cookieExpiresIn,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
  });
};

export { createSendToken };
