'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: { 
        type: Sequelize.STRING(32),
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING(20),
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