'use strict';
module.exports = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define(
'SalesProducts', 
{
    saleId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  },
{
    timestamps: false,
    underscored: true,
    tableName: 'sales_products',
  },
);

  SalesProduct.associate = (models) => {
    models.Sales.belongsToMany(models.Product, {
      as: 'products',
      through: SalesProduct,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });
    models.Product.belongsToMany(models.Sales, {
      as: 'sales',
      through: SalesProduct,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
  };
  
  return SalesProduct;
};