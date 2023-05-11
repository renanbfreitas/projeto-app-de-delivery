const { Router } = require('express');
const CustomerRoute = require('./CustomerRoute');

const route = Router();

route.use(CustomerRoute);

module.exports = route;
