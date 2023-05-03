const { compareSync } = require('bcryptjs');
const { User } = require('../../database/models');
const authToken = require('../auth/authToken');

const invalid = 'Invalid email or password';

const loginFunction = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return { type: 'INVALID_VALUES', message: invalid };
  }

  const comparePassword = await compareSync(password, user.password);

  if (!comparePassword) {
    return { type: 'INVALID_VALUES', message: invalid };
  }

  const { id, role } = user;

  const token = authToken.generateToken({ id, role });

  return { type: null, message: token };
};

module.exports = { loginFunction };