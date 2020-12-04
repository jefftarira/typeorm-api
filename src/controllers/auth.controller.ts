import { Request, Response } from 'express';

import { User } from '../entities/User';
import { env } from '../env';
import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';

export async function signup(req: Request, res: Response): Promise<Response> {
  const newUser = getRepository(User).create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  newUser.password = await newUser.encryptPassword(newUser.password);
  const createdUser = await getRepository(User).save(newUser);
  return res.status(201).json(createdUser.toJSON());
}

export async function signin(req: Request, res: Response): Promise<Response> {
  const { email, password } = req.body;

  const user = await getRepository(User).findOne({ email });
  if (!user)
    return res
      .status(400)
      .json({ message: 'Email or password was incorrect!' });

  const isCorrectPassword: boolean = await user.validatePassword(password);
  if (!isCorrectPassword)
    return res
      .status(400)
      .json({ message: 'Email or password was incorrect!' });

  const token: string = jwt.sign({ _id: user.id }, env.jwt.secret, {
    expiresIn: '24h',
  });

  return res
    .header('auth-token', token)
    .json({ message: 'User authenticated' });
}

export function profile(req: Request, res: Response): Response {
  return res.json({ message: 'profile' });
}
