// import express from 'express'; 
// // const express = require('express');
// const server = express();
// const port = 3000;

// server.get('/hello', function (req, res) {
//     res.send('Hello World!');
// });

// server.listen(port, function () {
//     console.log('listening on ' + port);
// });

import { add, getFoo } from  './archieve.js';

console.log(add(1,2));

console.log(getFoo());