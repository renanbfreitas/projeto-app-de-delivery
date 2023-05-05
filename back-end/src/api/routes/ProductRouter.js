const { Router } = require('express');
const productController = require('../controller/ProductController');

const route = Router();

route.get('/', productController.getAll);
route.get('/:id', productController.getById);

module.exports = route;
