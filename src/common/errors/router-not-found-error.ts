import { CustomError } from "./custom-error";
import { HttpStatusCode } from "axios";
import { ErrorMessage } from "../constant";

export class RouterNotFoundError extends CustomError {
  statusCode = HttpStatusCode.NotFound;

  constructor() {
    super(ErrorMessage.ROUTER_NOT_FOUND);

    Object.setPrototypeOf(this, RouterNotFoundError.prototype);
  }

  serializeErrors = () => [{ message: ErrorMessage.ROUTER_NOT_FOUND }];
}
