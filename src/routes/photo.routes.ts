import { getPhotos, uploadPhoto } from '../controllers/photo.contoller';

import { Router } from 'express';
import multer from '../libs/multer';

const router: Router = Router();

router
  .route('/photos')
  .get(getPhotos)
  .post(multer.single('image'), uploadPhoto);

export default router;
