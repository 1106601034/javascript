import { Router } from 'express';
import greeting from "../controllers/helloWorld/helloWorld.js";

const router = Router();

router.get('/', greeting);


export default router;
