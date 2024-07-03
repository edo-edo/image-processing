import { Request, Response, NextFunction } from "express";
import { MulterError } from "multer";
import { StatusCodes } from "http-status-codes";

import { CustomError } from "../common/errors/custom-error";
import { ErrorMessage } from "../common/constant";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ errors: err.serializeErrors() });
  }

  if (err instanceof MulterError) {
    let errorMessage;
    switch (err.code) {
      case ErrorMessage.LIMIT_UNEXPECTED_FILE:
        errorMessage = `Unexpected field: ${err.field}`;
        break;
      case ErrorMessage.LIMIT_FILE_SIZE:
        errorMessage = `File too large`;
        break;
      case ErrorMessage.LIMIT_FILE_COUNT:
        errorMessage = `Too many files`;
        break;
      case ErrorMessage.LIMIT_FIELD_KEY:
        errorMessage = `Field name too long: ${err.field}`;
        break;
      default:
        errorMessage = `Multer error: ${err.message}`;
        break;
    }

    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: [{ message: errorMessage }],
    });
  }

  console.log(err, "error handler error message");

  res.status(StatusCodes.BAD_REQUEST).json({
    errors: [{ message: ErrorMessage.SMTH_WENT_WRONG }],
  });
};
