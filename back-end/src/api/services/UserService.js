const { User } = require('../../database/models');
const sign = require('../utils/jwt');
const { validatorFieldsLogin } = require('./validators/validatorFunctions');
const { verifyPassword } = require('../utils/md5');

const invalid = 'Invalid email or password';

const loginFunction = async (email, password) => {
  if (validatorFieldsLogin({ email, password })) {
    return { type: 'INVALID_VALUES', message: invalid };
  }

  const result = await User.findOne({ where: { email } });

  const user = result ? result.dataValues : null;

  if (!user) {
    return { type: 'NOT_FOUND', message: invalid }; 
  }

  const { password: passwordDB, ...userWithoutPassword } = user;

  if (!verifyPassword(passwordDB, password)) {
  return { type: 'NOT_FOUND', message: invalid };   
  }

  const token = sign(userWithoutPassword);

  return { type: null, message: token };
};

module.exports = { loginFunction };