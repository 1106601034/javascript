import type { RequestHandler } from "express";
import { validationResult } from "express-validator";

const validation: RequestHandler = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const formattedErrors: Record<string, string[]> = {};

        errors.array().forEach((error) => {
            const field = "path" in error
                ? error.path
                : "param" in error
                    ? error.param
                    : "unknown";
            const fieldKey = typeof field === "string" ? field : "unknown";

            if (!formattedErrors[fieldKey]) {
                formattedErrors[fieldKey] = [];
            }

            formattedErrors[fieldKey].push(error.msg);
        });

        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: formattedErrors,
        });
    }

    next();
};

export default validation;
