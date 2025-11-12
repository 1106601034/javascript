import express from "express";
import cors from "cors";
import { connectToDB } from "./database/db.ts";
import userRouter from "./routes/users.ts";
import ValidationRouter from "./routes/dataValidation.ts";
import movieReview from "./routes/movieReview.ts";
import { config } from './config/env.ts';
import logger from "./config/winston.ts";
import pageNotFound from "./middlewares/pageNotFound.ts";
import errorHandler from "./middlewares/errorHandler.ts";
import index from "./routes/index.ts";
const app = express();
connectToDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));

app.use("/", index);
app.use("/users", userRouter);
app.use("/validation", ValidationRouter);
app.use("/movieReview", movieReview);
app.use(pageNotFound);
app.use(errorHandler);

app.listen(config.app.port, () => {
    logger.info(`Server running on ${config.app.baseUrl}:${config.app.port}`);
});