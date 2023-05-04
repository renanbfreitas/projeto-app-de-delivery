const { DataTypes } = require('sequelize');
const { INTEGER } = DataTypes;

const CreateSalesProducts = (sequelize) => {
  const SalesProduct = sequelize.define(
'SalesProducts', 
{
    saleId: INTEGER,
    productId: INTEGER,
    quantity: INTEGER,
  },
{
    timestamps: false,
    underscored: true,
    tableName: 'SalesProducts',
  },
);

  SalesProduct.associate = (models) => {
    models.Sales.belongsToMany(models.Products, {
      as: 'Product',
      through: SalesProduct,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });
    
    models.Products.belongsToMany(models.Sales, {
      as: 'Sales',
      through: SalesProduct,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
  };
  
  return SalesProduct;
};

module.exports = CreateSalesProducts;