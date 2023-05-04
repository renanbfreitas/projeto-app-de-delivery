const { DataTypes } = require('sequelize');
const { INTEGER, STRING, DECIMAL, DATE } = DataTypes;

const CreateSale = (sequelize) => {
  const Sale = sequelize.define('Sales', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    userId: INTEGER,
    sellerId: INTEGER,
    totalPrice: DECIMAL,
    deliveryAdress: STRING,
    deliveryNumber: STRING,
    saleDate: DATE,
    status: STRING,
  }, {
    timestamps: false,
    tableName: 'sales',
  });
  Sale.associate = (models) => {
    Sale.belongsTo(
models.Users,
      { foreignKey: 'userId', as: 'users' },
    );
    Sale.belongsTo(
models.Users,
      { foreignKey: 'sellerId', as: 'sellers' },
    );
  };
  return Sale;
};

module.exports = CreateSale;