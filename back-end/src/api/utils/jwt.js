const jwt = require('jsonwebtoken');
const fs = require('fs');

const config = { algorithm: 'HS256', expiresIn: '14d' };
const buffer = fs.readFileSync('jwt.evaluation.key');
const jwtKey = buffer.toString('utf8');

const sign = (userData) => {
  const { password, ...publicInfo } = userData;
  return jwt.sign(publicInfo, jwtKey, config);
  };

module.exports = sign;
