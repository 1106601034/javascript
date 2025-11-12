import mongoose from "mongoose";
import { config } from "../config/env.js"
import logger from "../config/winston.js";

export const connectToDB = async () => {
    const db = config.database.connect_string;

    if (!db) {
        logger.error("connection string not defined");
        process.exit(1);
    }

    const conn = mongoose.connection;
    conn.on("connected", () => logger.info(`DB connected, ${db}`));
    conn.on('open', () => logger.info('mongodb connection open'));
    conn.on("disconnected", () => logger.info("mongodb connection lost"));
    conn.on('reconnected', () => logger.info('mongodb connection reconnected'));
    conn.on('disconnecting', () => logger.info('mongodb connection disconnecting'));
    conn.on('close', () => logger.info('mongodb connection close'));
    conn.on("error", (error) => {
        logger.error(error.message);
    });

    try {
        await mongoose.connect(db);
        console.log("MongoDB is Connected...");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
