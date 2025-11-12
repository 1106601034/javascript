import { Router } from 'express';
import dataValidation from "../controllers/dataValidation/dataValidation.ts";

const router = Router();

router.post(
    "/",
    dataValidation.requirements,
    dataValidation.validation,
    dataValidation.dataValidation,
);

export default router;