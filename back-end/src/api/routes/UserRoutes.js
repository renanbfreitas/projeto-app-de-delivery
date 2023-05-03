const express = require('express');
const { UserController } = require('../controller');

const userRoute = express.Router();

userRoute.post('/', UserController.login);

module.exports = userRoute;