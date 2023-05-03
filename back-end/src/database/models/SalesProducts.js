'use strict';
const {
  Model
} = require('sequelize');
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
    tableName: 'SalesProducts',
  },
);

  SalesProduct.associate = (models) => {
    models.Sales.belongsToMany(models.Product, {
      as: 'Product',
      through: SalesProduct,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });
    
    models.Product.belongsToMany(models.Sales, {
      as: 'Sales',
      through: SalesProduct,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
  };
  
  return SalesProduct;
};