import mongoose from "mongoose";
import logger from "../config/winston.js";

const connectToDB = async () => {
    if (!process.env.CONNECTION_STRING) {
        logger.error("connection string not defined");
        process.exit(1);
    }

    const conn = mongoose.connection;
    conn.on("connected", () => logger.info(`DB connected, ${connectionString}`));
    conn.on('open', () => logger.info('mongodb connection open'));
    conn.on("disconnected", () => logger.info("mongodb connection lost"));
    conn.on('reconnected', () => logger.info('mongodb connection reconnected'));
    conn.on('disconnecting', () => logger.info('mongodb connection disconnecting'));
    conn.on('close', () => logger.info('mongodb connection close'));
    conn.on("error", (error) => {
        logger.error(error.message);
    });

    const connectionString = process.env.CONNECTION_STRING;
    // const connectionString = process.env.MONGOOSE_STRING;
    return await mongoose.connect(connectionString);
};

export default connectToDB;