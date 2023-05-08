const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'secret';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  const { payload } = jwt.verify(token, secret); 
  req.userData = payload;

  if (!payload) return res.status(401).json({ message: 'Invalid token' });
  
  return next();
};

module.exports = verifyToken;