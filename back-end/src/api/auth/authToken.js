const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'secret';

const config = { algorithm: 'HS256', expiresIn: '7h' };

const generateToken = (payload) => jwt.sign(payload, secret, config);

const verifyToken = (token) => jwt.verify(token, secret);

module.exports = { generateToken, verifyToken };