import * as photoController from '../controllers/photo.contoller';

import { Router } from 'express';
import { isAuth } from '../middlewares/auth';
import multer from '../libs/multer';

const router: Router = Router();

router
  .route('/photos')
  .get(isAuth, photoController.getPhotos)
  .post(isAuth, multer.single('image'), photoController.uploadPhoto);

router
  .route('/photos/:id')
  .get(isAuth, photoController.getPhoto)
  .put(isAuth, photoController.updatePhoto)
  .delete(isAuth, photoController.deletePhoto);

export default router;
