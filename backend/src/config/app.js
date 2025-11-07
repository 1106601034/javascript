import dotenv from "dotenv";

dotenv.config()
process.env.NODE_ENV = process.env.NODE_ENV ?? "dev";

export const config = {
    app: {
        port: parseInt(process.env.PORT || '8080'),
        api: {
            prefix: process.env.prefix ?? "/api/v1/",
        },
    }
}