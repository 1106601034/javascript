import { Router } from 'express';
import getUsers from '../controllers/example/userController.js';
import dataValidation from "../controllers/dataValidation/dataValidation.js";
import greeting from "../controllers/helloWorld/helloWorld.js";
import pageNotFound from "../controllers/pageNotFound/pageNotFound.js";

const router = Router();

router.get('/users', getUsers.getAllUsers);
router.get('/users/:id', getUsers.getUserByID);
router.get('/', greeting);
router.post(
    "/register",
    dataValidation.requirements,
    dataValidation.validation,
    dataValidation.dataValidation,
);
router.use(pageNotFound);
export default router;
