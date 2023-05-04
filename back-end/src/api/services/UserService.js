const { compareSync } = require('bcryptjs');
const { User } = require('../../database/models');
const authToken = require('../auth/authToken');

const invalid = 'Invalid email or password';

const loginFunction = async (email, password) => {
  const { dataValues } = await User.findOne({ where: { email } });
  console.log(dataValues);

  if (!dataValues) {
    return { type: 'INVALID_VALUES', message: invalid };
  }

  const comparePassword = await compareSync(password, dataValues.password);

  if (!comparePassword) {
    return { type: 'INVALID_VALUES', message: invalid };
  }

  const { id, role } = dataValues;

  const token = authToken.generateToken({ id, role });

  return { type: null, message: token };
};

module.exports = { loginFunction };