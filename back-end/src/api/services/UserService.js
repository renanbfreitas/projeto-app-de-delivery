const { compareSync } = require('bcryptjs');
const { User } = require('../../database/models');
const sign = require('../utils/jwt');

const invalid = 'Invalid email or password';

const loginFunction = async (email, password) => {
  const { dataValues } = await User.findOne({ where: { email } });

  if (!dataValues) {
    return { type: 'INVALID_VALUES', message: invalid };
  }

  const comparePassword = await compareSync(password, dataValues.password);

  if (!comparePassword) {
    return { type: 'INVALID_VALUES', message: invalid };
  }

  const token = sign(dataValues);

  return { type: null, message: token };
};

module.exports = { loginFunction };