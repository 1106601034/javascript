import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import createError from "http-errors";
import cors from "cors";

import router from "./routes/index.js";
import userRouter from "./routes/users.js";
import ValidationRouter from "./routes/dataValidation.js";

import { config } from "./config/app.js";
import pageNotFound from "./middlewares/pageNotFound/pageNotFound.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/", router);
app.use("/users", userRouter);
app.use("/validation", ValidationRouter);

app.use(pageNotFound);

app.listen(config.app.port, () => {
    console.log(`Server running on http://localhost:${config.app.port}`);
});

export default app;
