import { Request, Response } from 'express';

import { TOKEN_SECRET } from '../config';
import { User } from '../entities/User';
import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';

export const signup = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newUser = getRepository(User).create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  newUser.password = await newUser.encryptPassword(newUser.password);
  const createdUser = await getRepository(User).save(newUser);
  return res.json({
    message: 'User created',
    id: createdUser.id,
    email: createdUser.email,
  });
};

export const signin = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await getRepository(User).findOne({ email: req.body.email });
  if (!user)
    return res.status(400).json({ message: 'Email or password ir worng!' });

  const isCorrectPassword: boolean = await user.validatePassword(
    req.body.password
  );

  if (!isCorrectPassword)
    return res.status(400).json({ message: 'Password is worng!' });

  const token: string = jwt.sign({ _id: user.id }, TOKEN_SECRET, {
    expiresIn: 86400,
  });

  return res
    .header('auth-token', token)
    .json({ message: 'User authenticated' });
};

export const profile = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.json({ message: 'profile' });
};
