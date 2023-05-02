import { DataTypes } from 'sequelize';

const { INTEGER, STRING, DECIMAL } = DataTypes;

const CreateProduct = (sequelize) => {
  const Product = sequelize.define('Product', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING,
    price: DECIMAL,
    urlImage: STRING,
  }, {
    timestamps: false,
    tableName: 'products',
  });
  
  return Product;
};

module.exports = CreateProduct;