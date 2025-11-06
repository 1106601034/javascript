import { Router } from 'express';
import getUsers from '../controllers/example/userController.js';
import dataValidation from "../controllers/dataValidation/dataValidation.js";
import greeting from "../controllers/helloWorld/helloWorld.js";

const router = Router();

router.get('/', greeting);
router.get('/users', getUsers.getAllUsers);
router.get('/users/:id', getUsers.getUserByID);

router.post(
    "/register",
    dataValidation.requirements,
    dataValidation.validation,
    dataValidation.dataValidation,
);

export default router;
