import { Router } from 'express';
import { UserController } from './user.controller.js';

const router = Router();

router.get('/', UserController.getAllUsers);
router.post('/', UserController.createUser);

export const UserRoutes = router;
