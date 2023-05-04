const { CreateUser } = require('../database/models');
const { generateToken } = require('../api/utils/jwt');
const { validatorFieldsLogin } = require('./validators/validatorFunctions');

const login = async (loginInfo) => {
  validatorFieldsLogin(loginInfo);
  const { email, password } = loginInfo;
  const user = await CreateUser.findOne({ where: { email } });
  if (!user) {
    const err = new Error('Not found');
    err.type = 404;
    throw err;
  }
  const { dataValues: { password: passwordDB, ...rest } } = user;
  if (!verifyPassword(passwordDB, password)) {
    const err = new Error('email or password is invalid');
    err.type = 404;
    throw err;
  }
  const token = generateToken(rest);
  return token;
};

module.exports = {
  login,
};
