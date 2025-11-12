import express from "express";
import cors from "cors";
import { connectToDB } from "./database/db.js";
import router from "./routes/index.js";
import userRouter from "./routes/users.js";
import ValidationRouter from "./routes/dataValidation.js";
import movieReview from "./routes/movieReview.js";
import { config } from './config/env.js';
import logger from "./config/winston.js";
import pageNotFound from "./middlewares/pageNotFound.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
connectToDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));

app.use("/", router);
app.use("/users", userRouter);
app.use("/validation", ValidationRouter);
app.use("/movieReview", movieReview);
app.use(pageNotFound);
app.use(errorHandler);

app.listen(config.app.port, () => {
    logger.info(`Server running on ${config.app.baseUrl}:${config.app.port}`);
});