const jwt = require('jsonwebtoken');
const secret = require('./secret');

const config = { algorithm: 'HS256', expiresIn: '14d' };

const sign = (userData) => {
  const { password, ...publicInfo } = userData;
  return jwt.sign(publicInfo, secret, config);
  };

module.exports = sign;
