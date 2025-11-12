import requirements from "./requirementMiddleware.js";
import validation from "./validationMiddleware.js";

const dataValidation = (req, res) => {
    const { name, email } = req.body;

    res.status(201).json({
        success: true,
        message: "Registration successful",
        user: { name, email }
    });
}

export default { requirements, validation, dataValidation };