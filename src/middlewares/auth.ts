import { NextFunction, Request, Response } from 'express';

import ApiException from '../exceptions/ApiException';
import { env } from '../env';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';

interface IPayload {
  _id: number;
  iat: number;
  expire: number;
}

export function isAuth(req: Request, res: Response, next: NextFunction): void {
  const token = req.header('auth-token');
  if (!token) throw new ApiException('Token not found', httpStatus.BAD_REQUEST);

  try {
    const payload = jwt.verify(token, env.jwt.secret) as IPayload;
    res.locals.userId = payload._id;
  } catch (e) {
    e.status = httpStatus.BAD_REQUEST;
    next(e);
  }

  next();
}
