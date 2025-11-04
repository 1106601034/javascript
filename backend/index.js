import config from "./config/config.js";
import express from "express";
import router from "./routes/routes.js";
import pageNotFound from "./controllers/pageNotFound/pageNotFound.js";

const app = express();

app.use('/api', router);
app.use(express.json());

app.use(pageNotFound);

app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
});
