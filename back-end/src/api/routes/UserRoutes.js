import { Router } from 'express';
import UserController from '../controller/UserController';

const userRoute = Router();

const userController = new UserController();

userRoute.post('/', userController.login);

export default userRoute;