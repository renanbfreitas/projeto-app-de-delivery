const AdminService = require('../services/AdminService');

  const adminRegister = async (req, res) => {
    const userInfo = req.body;
    
    try {
      const { type, message } = await AdminService.adminRegister(userInfo);
      if (type) return res.status(404).json(message);

      return res.status(201).end();
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };

module.exports = { adminRegister };
