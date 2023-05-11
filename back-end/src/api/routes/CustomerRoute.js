const { Router } = require('express');
const productController = require('../controller/ProductController');
const { OrderController } = require('../controller');

const route = Router();

route.get('/products', productController.getAll);
route.get('/products/:id', productController.getById);
route.get('/orders/:id', OrderController.getSales);

module.exports = route;
