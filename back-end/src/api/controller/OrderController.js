const OrderService = require('../services/OrderService');

const checkoutOrder = async (req, res) => {
  const { id } = req.userData;
  const orderInfo = req.body;
  orderInfo.userId = id;

  const { message } = await OrderService.checkoutOrder(orderInfo);

  return res.status(201).json(message);
};

const getSellers = async (req, res) => {
  const { message } = await OrderService.getSellers();
  return res.status(200).json(message);
};

const getSales = async (req, res) => {
  const { id } = req.params;
  const { message } = await OrderService.getOrders(id);
  return res.status(200).json(message);
};

 const getOrder = async (req, res) => {
   const { id } = req.params;
   const numberId = Number(id);
  const { message } = await OrderService.getOrder(numberId);
  return res.status(200).json(message);
 };

module.exports = { checkoutOrder, getSellers, getOrder, getSales };
