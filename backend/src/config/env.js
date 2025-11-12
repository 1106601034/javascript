import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import dotenv from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "../../.env") });

export const config = {
    app: {
        env: process.env.NODE_ENV,
        port: parseInt(process.env.BACKEND_PORT),
        baseUrl: process.env.APP_BASE_URL,
    },
    database: {
        connect_string: process.env.CONNECTION_STRING,
    },
};