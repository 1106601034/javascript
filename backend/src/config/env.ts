import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import dotenv from "dotenv";

interface AppConfig {
    env: string;
    port: number;
    baseUrl: string;
}

interface DatabaseConfig {
    connectionString: string;
}

interface Config {
    app: AppConfig;
    database: DatabaseConfig;
}

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "../../.env") });

const parsePort = (value?: string, fallback = 3000): number => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
};

export const config: Config = {
    app: {
        env: process.env.NODE_ENV ?? "development",
        port: parsePort(process.env.BACKEND_PORT),
        baseUrl: process.env.APP_BASE_URL ?? "http://localhost",
    },
    database: {
        connectionString: process.env.CONNECTION_STRING ?? "",
    },
};
