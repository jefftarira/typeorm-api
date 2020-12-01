import { NextFunction, Request, Response } from 'express';

import config from '../config';
import jwt from 'jsonwebtoken';

interface IPayload {
  _id: number;
  iat: number;
  expire: number;
}

export function isAuth(
  req: Request,
  res: Response,
  next: NextFunction
): unknown {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const payload = jwt.verify(token, config.jwtSecret) as IPayload;
    res.locals.userId = payload._id;
  } catch (e) {
    return res.status(401).json({ message: 'Can not verify token', error: e });
  }

  next();
}
