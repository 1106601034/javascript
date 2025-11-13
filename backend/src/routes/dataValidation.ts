import { Router } from 'express';
import dataValidation from "../controllers/dataValidation/dataValidation.js";

const router = Router();

router.post(
    "/",
    dataValidation.requirements,
    dataValidation.validation,
    dataValidation.dataValidation,
);

export default router;