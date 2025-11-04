import express from "express";
import dataValidation from "./components/dataValidation/dataValidation.js";
import greeting from "./components/helloWorld/helloWorld.js";
import pageNotFound from "./components/pageNotFound/pageNotFound.js";

const app = express();

app.use(express.json());

app.get("/", greeting);

app.get("*", pageNotFound);

app.post(
    "/register",
    dataValidation.requirements,
    dataValidation.validation,
    dataValidation.dataValidation,
);


export default app;
