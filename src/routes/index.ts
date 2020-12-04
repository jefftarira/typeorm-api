import express, { Router } from 'express';

import ApiException from '../exceptions/ApiException';
import authRoutes from './auth.routes';
import handleError from '../middlewares/handleError';
import httpStatus from 'http-status';
import path from 'path';
import photoRouter from './photo.routes';
import userRoutes from './user.routes';

const routes: Router = Router();

routes.use(userRoutes);
routes.use(photoRouter);
routes.use('/auth', authRoutes);
//  folder for store public files
routes.use('/uploads', express.static(path.resolve('uploads')));

routes.all('*', (req, res, next) =>
  next(new ApiException('Not Found!', httpStatus.NOT_FOUND))
);

routes.use(handleError);

export default routes;
