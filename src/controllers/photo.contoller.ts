import { Request, Response } from 'express';

import Logger from '../middlewares/logger';

export function uploadPhoto(req: Request, res: Response): Response {
  Logger.info('Saving photo');
  return res.json({ message: 'Photo successfully saved' });
}

export function getPhotos(req: Request, res: Response): Response {
  Logger.info('Get list photos');
  return res.json({ message: 'List photos' });
}
