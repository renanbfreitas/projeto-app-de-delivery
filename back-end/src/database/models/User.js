import { DataTypes } from 'sequelize';
const { INTEGER, STRING } = DataTypes;

const CreateUser = (sequelize) => {
  const User = sequelize.define('Users', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING,
    email: STRING,
    password: STRING,
    role: STRING,
  }, {
    timestamps: false,
    tableName: 'users',
  });

  User.associate = (models) => {
    User.hasMany(models.Sales, { as: 'Sales', foreignKey: 'userId' });
    User.hasMany(models.Sales, { as: 'Sales', foreignKey: 'sellerId' });
  };
  
  return User;
};

module.exports = CreateUser;