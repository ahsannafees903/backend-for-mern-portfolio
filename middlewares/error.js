class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  if (err.code === 11000) {
    err.message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err.statusCode = 400;
  }
  if (err.name === "JsonWebTokenError") {
    err.message = `Json Web Token is invalid, Try again!`;
    err.statusCode = 400;
  }
  if (err.name === "TokenExpiredError") {
    err.message = `Json Web Token is expired, Try again!`;
    err.statusCode = 400;
  }
  if (err.name === "CastError") {
    err.message = `Invalid ${err.path}`;
    err.statusCode = 400;
  }
  if (err.name === "ValidationError") {
    err.message = Object.values(err.errors)
      .map((error) => error.message)
      .join(", ");
    err.statusCode = 400;
  }

  if (process.env.NODE_ENV !== "production") {
    console.error(err.stack);
  }

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};


export default ErrorHandler;
