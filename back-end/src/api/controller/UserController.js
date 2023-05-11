const { UserService } = require('../services');

const login = async (req, res) => {
  const { email, password } = req.body;

  const { type, message } = await UserService.loginFunction(email, password);

  if (type === 'INVALID_VALUES') return res.status(401).json({ message });
  if (type === 'NOT_FOUND') return res.status(404).json({ message });

  return res.status(200).json({ message });
};

const register = async (req, res) => {
  const userData = req.body;

  const { type, message } = await UserService.registerFunction(userData);

  if (type === 'CONFLICT') return res.status(409).json({ message });
  if (type) return res.status(401).json({ message });

  return res.status(201).json({ message });
};

const getAllUsers = async (req, res) => {
  const users = await UserService.getAllUsers();
  return res.status(200).json(users);
};

module.exports = { login, register, getAllUsers };