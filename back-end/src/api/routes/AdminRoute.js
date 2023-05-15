const { Router } = require('express');
const AdminController = require('../controller/AdminController');

const AdminRoute = Router();

AdminRoute.post('/register', AdminController.adminRegister);
AdminRoute.get('/users', AdminController.adminGetUsers);

module.exports = AdminRoute;
