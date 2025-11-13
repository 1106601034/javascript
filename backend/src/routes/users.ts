import { Router } from 'express';
import {
    getAllUsers,
    // createUser,
    getUserByID,
    // updateUserByID,
    // deleteUserByID,
} from '../controllers/users/userController.js';

const router = Router();

router.get('/', getAllUsers);
// router.post('/', createUser);
router.get('/:id', getUserByID);
// router.put('/:id', updateUserByID);
// router.delete('/:id', deleteUserByID);

export default router;