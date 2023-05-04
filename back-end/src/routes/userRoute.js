const { Router } = require('express');
const UserController = require('..');

const route = Router();

route.use('/login', UserController.login);

module.exports = route;
