'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sales = sequelize.define('Sales', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL,
    deliveryAdress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'sales',
  });
  Sales.associate = (models) => {
    Sales.belongsTo(models.User, { foreignKey: 'userId', as: 'users' });
    Sales.belongsTo(models.User, { foreignKey: 'sellerId', as: 'sellers' });
  };
  return Sales;
};