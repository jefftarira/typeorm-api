import { NextFunction, Request, Response } from 'express';

import { TOKEN_SECRET } from '../config';
import jwt from 'jsonwebtoken';

interface IPayload {
  _id: number;
  iat: number;
  expire: number;
}

export function TokenValidation(
  req: Request,
  res: Response,
  next: NextFunction
): unknown {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({ message: 'Access denied' });

  const payload = jwt.verify(token, TOKEN_SECRET) as IPayload;
  req.userId = payload._id;

  next();
}
