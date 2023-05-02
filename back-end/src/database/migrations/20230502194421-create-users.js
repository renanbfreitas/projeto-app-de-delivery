'use strict';

const { INTEGER, STRING } = require('sequelize');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable('users', {
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
      email: {
        type: STRING(100),
        allowNull: false,
        unique: true,
      },
      password: { 
        type: STRING(32),
        allowNull: false,
      },
      role: {
        type: STRING(20),
        allowNull: false, 
      },
    }, {
      timestamps: false
    })
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('users');
  }
};