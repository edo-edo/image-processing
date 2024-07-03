import { CustomError } from "./custom-error";
import { StatusCodes } from "http-status-codes";

export class InternalServerError extends CustomError {
  statusCode: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, InternalServerError.prototype);
  }

  serializeErrors = () => [{ message: this.message }];
}
