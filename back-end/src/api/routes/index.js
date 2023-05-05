const { Router } = require('express');
const productRoute = require('./ProductRouter');

const route = Router();

route.use(productRoute);

module.exports = route;
