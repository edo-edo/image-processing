import { CustomError } from "./custom-error";
import { StatusCodes } from "http-status-codes";
import { ErrorMessage } from "../constant";

export class DatabaseConnectionError extends CustomError {
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  reason = ErrorMessage.DATABASE_CONNECTION_ERROR;

  constructor() {
    super(ErrorMessage.DATABASE_CONNECTION_ERROR);
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors = () => [{ message: this.reason }];
}
