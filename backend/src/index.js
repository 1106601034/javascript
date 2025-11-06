import { config } from "./config/env.js";
import express from "express";
import router from "./routes/routes.js";
import pageNotFound from "./controllers/pageNotFound/pageNotFound.js";

const app = express();

app.use('/api', router);
app.use(express.json());

app.use(pageNotFound);

app.listen(config.app.port, () => {
    console.log(`Server running on http://localhost:${config.app.port}`);
});
