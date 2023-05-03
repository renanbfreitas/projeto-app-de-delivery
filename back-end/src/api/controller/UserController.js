const { UserService } = require('../services');

const login = async (req, res) => {
  const { email, password } = req.body;

  const { type, message } = await UserService.loginFunction(email, password);

  if (type) return res.status(401).json({ message });

  res.status(200).json({ token: message });
};

module.exports = { login };

  // async verifyLogin(req, res) {
  //   const { user } = req.body;
  //   return res.status(200).json({ role: user.payload.role });
  // }