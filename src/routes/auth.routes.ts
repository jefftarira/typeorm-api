import { profile, signin, signup } from '../controllers/auth.controller';

import { Router } from 'express';
import { isAuth } from '../middlewares/auth';

const router: Router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', isAuth, profile);

export default router;
