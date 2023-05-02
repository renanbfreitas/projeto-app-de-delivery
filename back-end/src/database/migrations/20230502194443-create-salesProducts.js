'use strict';

const { INTEGER } = require('sequelize');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sales_products', {
      saleId: {
        type: INTEGER,
        allowNull: false,
        field: 'sale_id',
        references: {
          model: 'sales',
          key: 'id',
        },
        primaryKey: true,
        onDelete: 'cascade',
      },
      productId: {
        type: INTEGER,
        allowNull: false,
        field: 'product_id',
        references: {
          model: 'products',
          key: 'id',
        },
        primaryKey: true,
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      quantity: {
        type: INTEGER,
        allowNull: false,
      },
    })
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('sales_products');
  }
};