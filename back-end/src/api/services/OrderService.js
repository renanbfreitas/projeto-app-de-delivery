const { SalesProducts } = require('../../database/models');
const { Sales } = require('../../database/models');

const checkoutOrder = async (orderInfo, userData) => {
  const saveSales = orderInfo.forEach((order) => SalesProducts.create(
    { productId: order.id, quantity: order.quantity },
));
  await Promise.all(saveSales);

  return result;
};

module.exports = { checkoutOrder };