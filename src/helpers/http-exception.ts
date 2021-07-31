import Joi from "joi";
import { StatusCode } from "./enum";
import { ValidationError } from "../interface/validation-error";
export class HttpException extends Error {
	status: number;
	message: string;
	status_code: StatusCode;
	validation_errors?: ValidationError[];
	retry_count?: number;
	constructor(status: number, message: string, status_code: number, validation_errors?: ValidationError[], retry_count?: number) {
		super(message);
		this.status = status;
		this.message = message;
		this.status_code = status_code;
		this.retry_count = retry_count;
		if (validation_errors) this.validation_errors = validation_errors;
		if (retry_count) this.retry_count = retry_count;
	}
}

export class GenericException extends HttpException {
	constructor(message: string, status_code?: number) {
		if (!status_code) status_code = StatusCode.genericException;
		super(400, message || "Internal error", status_code);
	}
}

export class NoRecordFound extends HttpException {
	constructor(message?: string, status_code?: number) {
		if (!status_code) status_code = StatusCode.noRecordFound;
		super(404, message || "NoRecordFound", status_code);
		this.name = this.constructor.name;
	}
}

export class DatabaseErrorException extends HttpException {
	constructor(message?: string, status_code?: number) {
		if (!status_code) status_code = StatusCode.databaseError;
		super(500, message || "Database error", status_code);
	}
}

export class ValidationException extends HttpException {
	validation_errors: ValidationError[]
	constructor(err: Joi.ValidationError, status_code?: number) {
		if (!status_code) status_code = StatusCode.validationError;
		super(422, "Validation Error!", status_code);
		const validationErrors: ValidationError[] = [];
		for (const each of err.details) {
			const key = each.path as unknown;
			validationErrors.push({ [key as string]: each.message });
		}
		this.validation_errors = validationErrors;
	}
}
