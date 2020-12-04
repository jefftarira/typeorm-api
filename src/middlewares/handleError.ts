import { NextFunction, Request, Response } from 'express';

import ApiException from '../exceptions/ApiException';
import httpStatus from 'http-status';

export default function handleError(
  err: ApiException,
  req: Request,
  res: Response,
  next: NextFunction
): unknown {
  if (!err) {
    return new ApiException(
      'Error with the server!',
      httpStatus.INTERNAL_SERVER_ERROR
    );
  }

  const error = {
    name: err.name,
    status: err.status || httpStatus.INTERNAL_SERVER_ERROR,
    message: err.message || 'Internal Server Error.',
    stack: err.stack,
  };

  return res.status(error.status).json(error);
}
