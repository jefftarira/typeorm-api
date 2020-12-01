import { Request, Response } from 'express';

import Logger from '../middlewares/logger';
import { Photo } from '../entities/Photo';
import fs from 'fs-extra';
import { getRepository } from 'typeorm';
import path from 'path';

export async function uploadPhoto(
  req: Request,
  res: Response
): Promise<Response> {
  Logger.info('Saving photo');
  const { title, description } = req.body;
  const newPhoto = getRepository(Photo).create({
    title: title,
    description: description,
    url: req.file.path,
    user: res.locals.userId,
  });
  const createdPhoto = await getRepository(Photo).save(newPhoto);
  return res.status(201).json(createdPhoto);
}

export async function getPhotos(
  req: Request,
  res: Response
): Promise<Response> {
  const photos = await getRepository(Photo)
    .createQueryBuilder('photo')
    .select('photo')
    .addSelect(['user.id', 'user.firstname', 'user.lastname', 'user.email'])
    .leftJoin('photo.user', 'user')
    .getMany();
  return res.json(photos);
}

export async function getPhoto(req: Request, res: Response): Promise<Response> {
  const photos = await getRepository(Photo).findOne(req.params.id);
  return res.json(photos);
}

export async function deletePhoto(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const photo = await getRepository(Photo).findOne(id);
  if (photo) {
    await getRepository(Photo).delete(id);
    await fs.unlink(path.resolve(photo.url));
    return res.json({ message: 'Photo deleted', photo: photo });
  }
  return res.status(404).json({ message: 'Photo not found' });
}

export async function updatePhoto(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const { title, description } = req.body;
  const updatedPhoto = getRepository(Photo).create({
    title: title,
    description: description,
  });
  const photo = await getRepository(Photo).findOne(id);

  if (photo) {
    getRepository(Photo).merge(photo, updatedPhoto);
    const results = await getRepository(Photo).save(photo);
    return res.json(results);
  }
  return res.status(404).json({ message: 'Photo not found' });
}
