const jwt = require('jsonwebtoken');

module.exports = {
  sign: (obj) => {
    const { password, ...publicInfo } = obj;
    return jwt.sign(publicInfo, 'secret_key');
  },
};
