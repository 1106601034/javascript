import express from "express";
import cors from "cors";
import { connectToDB } from "./database/db.js";
import userRouter from "./routes/users.js";
import ValidationRouter from "./routes/dataValidation.js";
import movieReview from "./routes/movieReview.js";
import { config } from './config/env.js';
import logger from "./config/winston.js";
import pageNotFound from "./middlewares/pageNotFound.js";
import errorHandler from "./middlewares/errorHandler.js";
import index from "./routes/index.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));

app.use("/", index);
app.use("/users", userRouter);
app.use("/validation", ValidationRouter);
app.use("/movieReview", movieReview);
app.use(pageNotFound);
app.use(errorHandler);

const startServer = async (): Promise<void> => {
    try {
        await connectToDB();
        app.listen(config.app.port, () => {
            logger.info(`Server running on ${config.app.baseUrl}:${config.app.port}`);
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        logger.error(`Failed to start server: ${message}`);
        process.exit(1);
    }
};

void startServer();
