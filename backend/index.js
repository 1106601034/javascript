import config from "./config/config.js";
import app from "./src/app.js";

app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
});
