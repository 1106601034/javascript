import type { RequestHandler } from "express";
import requirements from "./requirementMiddleware.ts";
import validation from "./validationMiddleware.ts";

interface RegistrationPayload {
    name: string;
    email: string;
}

const dataValidation: RequestHandler = (req, res) => {
    const { name, email } = req.body as RegistrationPayload;

    res.status(201).json({
        success: true,
        message: "Registration successful",
        user: { name, email },
    });
};

export default { requirements, validation, dataValidation };
