import mongoose from "mongoose";
import logger from "../config/winston.js";

const connectToDB = () => {
    // if (!process.env.CONNECTION_STRING) {
    //     logger.error("connection string not defined");
    //     process.exit(1);
    // }

    const connectionString = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/javascriptApp';
    const db = mongoose.connection;

    db.on("connected", () => {
        logger.info(`DB connected, ${connectionString}`);
    });

    db.on("error", (error) => {
        logger.error(error.message);
        process.exit(1);
    });

    db.on("disconnected", () => {
        logger.info("mongodb connection lost");
    });

    return mongoose.connect(connectionString);
};

export default connectToDB;