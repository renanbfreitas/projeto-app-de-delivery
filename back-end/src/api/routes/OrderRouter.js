const { Router } = require('express');
const verifyToken = require('../middlewares/auth/authToken');
const OrderController = require('../controller/OrderController');

const OrderRoute = Router();

OrderRoute.post('/finish', verifyToken, OrderController.checkoutOrder);
OrderRoute.get('/getOrder/:id', OrderController.getOrder);
OrderRoute.get('/sellers', OrderController.getSellers);
OrderRoute.get('/sales/:id', OrderController.getSalesFromSeller);

module.exports = OrderRoute;
