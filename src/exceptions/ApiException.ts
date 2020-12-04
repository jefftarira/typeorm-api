import httpStatus from 'http-status';

class ApiError extends Error {
  public name: string;
  public status: number;
  public message: string;
  constructor(message: string, status: number) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ApiException extends ApiError {
  constructor(message: string, status = httpStatus.INTERNAL_SERVER_ERROR) {
    super(message, status);
  }
}

export default ApiException;
