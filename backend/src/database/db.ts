import mongoose from "mongoose";
import { config } from "../config/env.ts";
import logger from "../config/winston.ts";

export const connectToDB = async (): Promise<void> => {
    const connectionString = config.database.connectionString;

    if (!connectionString) {
        logger.error("connection string not defined");
        process.exit(1);
    }

    const conn = mongoose.connection;
    conn.on("connected", () => logger.info(`DB connected, ${connectionString}`));
    conn.on("open", () => logger.info("mongodb connection open"));
    conn.on("disconnected", () => logger.info("mongodb connection lost"));
    conn.on("reconnected", () => logger.info("mongodb connection reconnected"));
    conn.on("disconnecting", () => logger.info("mongodb connection disconnecting"));
    conn.on("close", () => logger.info("mongodb connection close"));
    conn.on("error", (error: Error) => {
        logger.error(error.message);
    });

    try {
        await mongoose.connect(connectionString);
        logger.info("MongoDB is Connected...");
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        logger.error(message);
        process.exit(1);
    }
};
