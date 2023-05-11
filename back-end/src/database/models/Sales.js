'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sales = sequelize.define('Sales', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW},
    status: DataTypes.STRING,
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'sales',
  });
  Sales.associate = (models) => {
    Sales.belongsTo(models.User, { foreignKey: 'userId', as: 'users' });
    Sales.belongsTo(models.User, { foreignKey: 'sellerId', as: 'seller' });
  };
  return Sales;
};