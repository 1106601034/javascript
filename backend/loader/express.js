import express from "express";
import cors from "cors";
import router from "../src/routes/v1/api/routes.js";
import { config } from "../src/config/app.js";
import pageNotFound from "../src/controllers/pageNotFound/pageNotFound.js";

const startServer = () => {
    const expressApp = express();
    try {
        expressApp.listen(config.app.port, () => {
            console.log(`Server running on http://localhost:${config.app.port}`);
        });
    } catch (error) {
        console.log(error);
        process.exit();
    }
    return expressApp;
}

export default function loadServer() {
    const app = startServer();
    app.use(cors());
    app.use('/api', router);
    app.use(express.json());
    app.use(pageNotFound);
    return app;
}