'use strict';
const { DATE, DECIMAL, INTEGER, NOW, STRING } = require('sequelize')

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable('sales', {
      id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: INTEGER,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        }
      },
      sellerId: {
        type: INTEGER,
        allowNull: false,
        field: 'seller_id',
        references: {
          model: 'users',
          key: 'id',
        }
      },
      totalPrice: {
        type: DECIMAL(9,2),
        allowNull: false,
        field: 'total_price',
      },
      deliveryAdress: {
        type: STRING(100),
        allowNull: false,
        field: 'delivery_adress',
      },
      deliveryNumber: {
        type: STRING(50),
        allowNull: false,
        field: 'delivery_number',
      },
      saleDate: {
        type: DATE,
        defaultValue: NOW,
        allowNull: false,
        field: 'sale_date',
      },
      status: {
        type: STRING(50),
        allowNull: false,
      },
    }, {
      timestamps: false,
      underscored: true,
    })
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('sales');
  }
};