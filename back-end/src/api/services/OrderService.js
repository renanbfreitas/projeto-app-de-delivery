const { SalesProducts } = require('../../database/models');
const { Sales } = require('../../database/models');
const { User } = require('../../database/models');

const checkoutOrder = async (orderInfo) => {
  const { products, ...orderWithoutProducts } = orderInfo;

  const result = await Sales.create(orderWithoutProducts);

  const saveSales = products.map((order) => SalesProducts.create(
    { saleId: result.id, productId: order.id, quantity: order.quantity },
  ));
  await Promise.all(saveSales);

  return { type: null, message: result };
};

const getSellers = async () => {
  const dataValues = await User.findAll({ where: { role: 'seller' } });
  return { type: null, message: dataValues };
};

const getOrders = async (id) => {
  const dataValues = await Sales.findAll({
    where: { userId: id },
  });
  return { type: null, message: dataValues };
};

module.exports = { checkoutOrder, getSellers, getOrders };