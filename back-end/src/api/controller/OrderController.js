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
   const { id: rawId } = req.params;
   const id = Number(rawId);
  const { message } = await OrderService.getOrder(id);
  return res.status(200).json(message);
 };

 const updateOrderStatus = async (req, res) => {
    const { id: rawId } = req.params;
    const id = Number(rawId);
    const { status } = req.body;
    console.log(req.params);
    console.log(req.body);

    await OrderService.updateOrderStatus(id, status);
    return res.status(200).end();
 };

module.exports = { checkoutOrder, getSellers, getOrder, getSales, updateOrderStatus };
