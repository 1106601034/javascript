import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import dotenv from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "../../.env") });

dotenv.config()
process.env.NODE_ENV = process.env.NODE_ENV;

export const config = {
    app: {
        port: parseInt(process.env.PORT),
        api: {
            prefix: process.env.PREFIX,
        },
    }
}