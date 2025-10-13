import exprees from 'express';
const app = exprees();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running...`);
    console.log(`Example app listening on port http://localhost:${port}/`);
    console.log(`Press Ctrl+C to stop the server`);
});