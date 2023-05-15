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
};

module.exports = { adminRegister };
