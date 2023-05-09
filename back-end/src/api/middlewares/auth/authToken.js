const jwt = require('jsonwebtoken');

const secret = require('../../utils/secret');

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;

  const payload = jwt.verify(authorization, secret);
  req.userData = payload;

  if (!payload) return res.status(401).json({ message: 'Invalid token' });

  return next();
};

module.exports = verifyToken;