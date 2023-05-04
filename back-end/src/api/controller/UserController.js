const { UserService } = require('../services');

const login = async (req, res) => {
  const { email, password } = req.body;

  const { type, message } = await UserService.loginFunction(email, password);

  if (type) return res.status(401).json({ message });

  return res.status(200).json({ token: message });
};

module.exports = { login };