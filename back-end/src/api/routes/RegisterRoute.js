const express = require('express');
const { UserController } = require('../controller');

const registerRoute = express.Router();

registerRoute.post('/', UserController.register);

module.exports = registerRoute;