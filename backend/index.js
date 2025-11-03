import express from "express";
import dataValidation from "./components/dataValidation/dataValidation.js";
import config from "./config/config.js";

const app = express();

app.use(express.json());

app.post("/register",
    dataValidation.requirements,
    dataValidation.validation,
    dataValidation.dataValidation,
);

app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
});
