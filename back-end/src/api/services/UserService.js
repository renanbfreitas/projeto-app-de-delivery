const { User } = require('../../database/models');
const sign = require('../utils/jwt');
const { 
  validatorFieldsLogin,
  validatorFieldsRegister, 
} = require('./validators/validatorFunctions');
const { verifyPassword, hashPassword } = require('../utils/md5');

const invalidLogin = 'Invalid email or password';
const invalidRegister = 'Invalid name, email or password';

const loginFunction = async (email, password) => {
  if (validatorFieldsLogin({ email, password })) {
    return { type: 'INVALID_VALUES', message: invalidLogin };
  }

  const result = await User.findOne({ where: { email } });
  const user = result ? result.dataValues : null;

  if (!user) {
    return { type: 'NOT_FOUND', message: invalidLogin }; 
  }

  const { password: passwordDB, ...userWithoutPassword } = user;

  if (!verifyPassword(passwordDB, password)) {
  return { type: 'NOT_FOUND', message: invalidLogin };   
  }

  const token = sign(userWithoutPassword);

  return { type: null, message: token };
};

const registerFunction = async ({ name, email, password }) => {
  if (validatorFieldsRegister({ name, email, password })) {
    return { type: 'INVALID_VALUES', message: invalidRegister };
  }

  const findUser = await User.findOne({ where: { email } });

  if (findUser) {
    return { type: 'CONFLICT', message: invalidRegister };
  }

  const hashedPassword = hashPassword(password);
  const userObj = { name, email, password: hashedPassword, role: 'customer' };
  const result = await User.create({ ...userObj });

  if (!result) {
    return { type: 'INVALID_VALUES', message: invalidRegister };
  }

  return { type: null, message: null };
};

module.exports = { loginFunction, registerFunction };