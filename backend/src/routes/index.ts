import { Router } from 'express';
import hello from "../controllers/helloWorld/helloWorld.ts";

const router = Router();

router.get("/", hello);

export default router;