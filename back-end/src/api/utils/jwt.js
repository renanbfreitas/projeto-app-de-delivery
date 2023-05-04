const jwt = require('jsonwebtoken');

const config = { algorithm: 'HS256', expiresIn: '7h' };
const secret = process.env.JWT_SECRET || 'secret';

const sign = (userData) => {
    const { password, ...publicInfo } = userData;
    return jwt.sign(publicInfo, secret, config);
  };

module.exports = sign;
