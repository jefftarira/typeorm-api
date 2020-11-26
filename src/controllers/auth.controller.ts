import { Request, Response } from 'express';

import { User } from '../entities/User';
import config from '../config';
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
  return res.status(201).json({
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
    return res
      .status(400)
      .json({ message: 'Email or password was incorrect!' });

  const isCorrectPassword: boolean = await user.validatePassword(
    req.body.password
  );

  if (!isCorrectPassword)
    return res
      .status(400)
      .json({ message: 'Email or password was incorrect!' });

  const token: string = jwt.sign({ _id: user.id }, config.jwtSecret, {
    expiresIn: '24h',
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
