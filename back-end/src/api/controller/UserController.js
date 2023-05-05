const { UserService } = require('../services');

const login = async (req, res) => {
  const { email, password } = req.body;

  const { type, message } = await UserService.loginFunction(email, password);

  if (type === 'INVALID_VALUES') return res.status(401).json({ message });
  if (type === 'NOT_FOUND') return res.status(404).json({ message });

  return res.status(200).json({ token: message });
};

const register = async (req, res) => {
  const userData = req.body;

  const { type, message } = await UserService.registerFunction(userData);

  if (type === 'CONFLICT') return res.status(409).json({ message });
  if (type) return res.status(401).json({ message });

  return res.status(201).json({ message });
};

module.exports = { login, register };