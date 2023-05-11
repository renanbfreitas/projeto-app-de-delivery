const { SalesProducts, Sales, User, Product } = require('../../database/models');

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
  const result = await User.findAll({ where: { role: 'seller' } });
  return { type: null, message: result };
};

const getOrder = async (id) => {
  const result = await Sales.findByPk(id, {
    include: [
      { model: Product, as: 'products' },
      { model: User, as: 'seller' },
    ] });

    const rawDate = result.dataValues.saleDate.toISOString().split('T')[0].split('-');
    const formattedDate = `${rawDate[2]}/${rawDate[1]}/${rawDate[0]}`;
    result.dataValues.saleDate = formattedDate;

  return { type: null, message: result };
};

const getOrders = async (id) => {
  const dataValues = await Sales.findAll({
    where: { userId: id },
  });
  return { type: null, message: dataValues };
};

module.exports = { checkoutOrder, getSellers, getOrder, getOrders };
