import { StatusCode } from "./enum";

export class Response {
	status_code?: number;
	message: string;
	data?: any;
	status: number;

	constructor(status: number, message: string, data?: any, status_code?: number) {
		this.status_code = status_code;
		this.message = message;
		this.data = data;
		this.status = status;
	}
}

export class OperationCompleted extends Response {
	constructor(public message: string = "Operation Completed", public records?: any, status_code?: number) {
		super(200, message, records, status_code);
		this.status_code = this.status_code ? this.status_code : StatusCode.operationCompleted;
	}
}