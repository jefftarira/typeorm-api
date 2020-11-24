import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../controllers/user.controller';

import { Router } from 'express';

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
