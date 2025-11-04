const express = require('express');
const router = express.Router();
const userController = require('../controllers/example/userController')
app.get('/', (req, res) => {
    router.get('/users', userController.getAllUsers);
    router.get('/users/:id', userController.getUserByID);
    module.exports = router;
})