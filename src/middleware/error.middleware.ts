import { NextFunction, Request, Response } from "express";
import { HttpException } from "../helpers/http-exception";
import { ValidationError } from "../interface/validation-error";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
  const errorObject: {
    message?: string,
    status_code?: number,
    validation_errors?: ValidationError[],
    retry_count?: number,
  } = {};

  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  const status_code = error.status_code || 100;
  errorObject.message = message;
  errorObject.status_code = status_code;
  if (error.validation_errors) errorObject.validation_errors = error.validation_errors;
  if (error.retry_count) errorObject.retry_count = error.retry_count;
  response
    .status(status)
    .send({
      ...errorObject,
    });
}

export default errorMiddleware;