'use strict';

const { INTEGER, STRING, DECIMAL } = require('sequelize');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable('products', {
      id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: STRING(100),
        allowNull: false,
      },
      price: {
        type: DECIMAL(4,2),
        allowNull: false,
      },
      urlImage: {
        type: STRING(200),
        allowNull: false,
        field: 'url_image',
      },
    }, {
      timestamps: false,
      underscored: true,
    })
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('products');
  }
};