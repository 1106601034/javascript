import express from "express";
import dataValidation from "./components/dataValidation/dataValidation.js";
import greeting from "./components/helloWorld/helloWorld.js";

const app = express();

app.use(express.json());

app.get("/", greeting);

app.post(
    "/register",
    dataValidation.requirements,
    dataValidation.validation,
    dataValidation.dataValidation,
);

export default app;
