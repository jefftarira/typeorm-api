import { profile, signin, signup } from '../controllers/auth.controller';

import { Router } from 'express';
import { TokenValidation } from '../middlewares/verifyToken';

const router: Router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', TokenValidation, profile);

export default router;
