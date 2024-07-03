import { ValidationError } from "express-validator";

import { CustomError } from "./custom-error";
import { StatusCodes } from "http-status-codes";

export class RequestValidationError extends CustomError {
  statusCode = StatusCodes.BAD_REQUEST;

  constructor(public errors: ValidationError[]) {
    super("Invalid request parameters");
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors = () => {
    return this.errors.map((error) => {
      console.log(error, "error");
      return { message: error.msg };
    });
  };
}
