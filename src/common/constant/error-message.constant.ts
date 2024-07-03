export enum ErrorMessage {
  // common
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  SMTH_WENT_WRONG = "SMTH_WENT_WRONG",
  DATABASE_CONNECTION_ERROR = "DATABASE_CONNECTION_ERROR",
  UNAUTHORIZED = "unauthorized",
  ROUTER_NOT_FOUND = "Router not found",
  SOURCE_AND_MASK_IS_REQUIRED = "SOURCE_AND_MASK_IS_REQUIRED",

  // multer error
  LIMIT_UNEXPECTED_FILE = "LIMIT_UNEXPECTED_FILE",
  LIMIT_FILE_SIZE = "LIMIT_FILE_SIZE",
  LIMIT_FILE_COUNT = "LIMIT_FILE_COUNT",
  LIMIT_FIELD_KEY = "LIMIT_FIELD_KEY",
}
