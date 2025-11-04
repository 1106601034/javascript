import express from "express";
import router from "./routes/routes.js";
import dataValidation from "./components/dataValidation/dataValidation.js";
import greeting from "./components/helloWorld/helloWorld.js";
import pageNotFound from "./components/pageNotFound/pageNotFound.js";

const app = express();

app.use('/api', router);
app.use(express.json());

app.get('/', greeting);

app.post(
    "/register",
    dataValidation.requirements,
    dataValidation.validation,
    dataValidation.dataValidation,
);

app.use(pageNotFound);

export default app;
