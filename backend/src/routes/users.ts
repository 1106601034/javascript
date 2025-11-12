import { Router } from 'express';
import getUsers from '../controllers/users/userController.ts';

const router = Router();

router.get('/', getUsers.getAllUsers);
router.get('/:id', getUsers.getUserByID);

export default router;