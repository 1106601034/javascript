import express from "express";
import validate from "./components/dataValidation/validationMiddleware.js";
import requirements from "./components/dataValidation/requirementMiddleware.js";
import dataValidation from "./components/dataValidation/dataValidation.js";
const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/register",
    requirements,
    validate,
    dataValidation,
);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
