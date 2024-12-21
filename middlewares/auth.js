import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  console.log("Cookies:", req.cookies); // Log cookies to debug
  const { token } = req.cookies;

  if (!token) {
    console.error("Token missing");
    return next(new ErrorHandler("User not Authenticated!", 400));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded Token:", decoded); // Log decoded token
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      console.error("User not found");
      return next(new ErrorHandler("User not Authenticated!", 400));
    }
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return next(new ErrorHandler("User not Authenticated!", 400));
  }
});
