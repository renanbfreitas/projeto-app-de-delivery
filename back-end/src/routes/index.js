const { Router } = require('express');
const loginRoute = require('./LoginRoute');

const route = Router();

route.use('/login', loginRoute);

module.exports = route;
