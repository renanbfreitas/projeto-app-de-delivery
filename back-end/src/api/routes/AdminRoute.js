const { Router } = require('express');
const AdminController = require('../controller/AdminController');

const AdminRoute = Router();

AdminRoute.post('/register', AdminController.adminRegister);

module.exports = AdminRoute;
