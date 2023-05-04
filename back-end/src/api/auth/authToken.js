const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'secret';

const verifyToken = (token) => jwt.verify(token, secret);

module.exports = verifyToken;