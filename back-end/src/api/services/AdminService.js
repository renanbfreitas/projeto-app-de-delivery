const { hashPassword } = require('../utils/md5');

const { User } = require('../../database/models');

const invalidRegister = 'Invalid name, email or password';

const adminRegister = async (userInfo) => {
  const { email, password } = userInfo;

  const findUser = await User.findOne({ where: { email } });

  if (findUser) {
    return { type: 'CONFLICT', message: invalidRegister };
  }

  const hashedPassword = hashPassword(password);
  const userObj = { ...userInfo, password: hashedPassword };

  const result = await User.create(userObj);

  if (!result) {
    return { type: 'INVALID_VALUES', message: invalidRegister };
  }
  return { type: null, message: result };
};

const adminGetUsers = async () => {
  const users = await User.findAll();

  return { message: users };
};

const adminDeleteUser = async (userId) => {
  const result = await User.destroy({ where: { id: userId } });

  if (!result) return { type: 'NOT_FOUND' };

  return { type: null };
};

module.exports = { adminRegister, adminGetUsers, adminDeleteUser };
