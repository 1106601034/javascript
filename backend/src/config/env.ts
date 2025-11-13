import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
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

const moduleDir = dirname(fileURLToPath(import.meta.url));
const projectEnvPath = join(process.cwd(), ".env");
const fallbackEnvPath = join(moduleDir, "../../.env");

dotenv.config({ path: projectEnvPath });
dotenv.config({ path: fallbackEnvPath });

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
