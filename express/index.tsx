import express from 'express';
import {
    routeHello,
    routeAPINames,
} from './src/routes.js';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send("root");
});

app.get('/Hello-World', (req, res) => {
    const response = routeHello(req, res);
    res.send(response);
});

app.get("/api/names", async function (req, res) {
    let response;
    try {
        response = await routeAPINames(req, res);
    } catch (error) {
        console.log(error);
    }
    res.send(response);
});

app.listen(port, () => {
    console.log(`listening on: http://localhost:${port}/`);
    console.log(`Press Ctrl+C to stop the server`);
});