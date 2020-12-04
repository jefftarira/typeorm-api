import * as userController from '../controllers/user.controller';

import { Router } from 'express';
import { isAuth } from '../middlewares/auth';

const router: Router = Router();

router.get('/users', isAuth, userController.getUsers);

router
  .route('/users/:id')
  .get(isAuth, userController.getUser)
  .put(isAuth, userController.updateUser)
  .delete(isAuth, userController.deleteUser);

export default router;
