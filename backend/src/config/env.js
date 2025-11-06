import dotenv from "dotenv";

dotenv.config()

export const config = {
    app: {
        port: parseInt(process.env.PORT || '3000')
    }
}