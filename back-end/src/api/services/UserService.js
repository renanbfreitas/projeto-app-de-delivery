import compareSync from 'bcryptjs';
import User from '../../database/models/User';
import TokenJwt from '../auth/authToken';

const invalid = 'Invalid email or password';

export default class UserService {
  constructor(model = User) {
    this.model = model;
  }

  async loginFunction(email, password) {
    const user = await this.model.findOne({ where: { email } });
    if (!user) {
      return { type: 'INVALID_VALUES', message: invalid };
    }
    const comparePassword = compareSync(password, user.password);
    if (!comparePassword) {
      return { type: 'INVALID_VALUES', message: invalid };
    }
    const { id, role } = user;
    const token = new TokenJwt().generateToken({ id, role });

    return { type: null, message: token };
  }
}