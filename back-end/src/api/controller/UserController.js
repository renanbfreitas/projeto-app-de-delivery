import UserService from '../services/UserService';

export default class UserController {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.userService = new UserService();
  }

  async login(req, res) {
    const { email, password } = req.body;
    const { type, message } = await this.userService.loginFunction(email, password);
    if (type) return res.status(401).json({ message });
    res.status(200).json({ token: message });
  }

  // async verifyLogin(req, res) {
  //   const { user } = req.body;
  //   return res.status(200).json({ role: user.payload.role });
  // }
}