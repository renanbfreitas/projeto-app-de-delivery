const jwt = require('jsonwebtoken');

class TokenJwt {
  constructor() {
    this.secret = process.env.JWT_SECRET || 'secret';

    this.config = {
      algorithm: 'HS256',
      expiresIn: '7h',
    };
  }

  generateToken(payload) {
    return jwt.sign(
      payload,
      this.secret,
      this.config,
    );
  }

  verifyToken(token) {
    return jwt.verify(
      token,
      this.secret,
    );
  }
}

export default TokenJwt;
