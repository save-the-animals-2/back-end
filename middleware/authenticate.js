const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

function authenticate() {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const decoded = jwt.verify(token, secrets.jwt);

      req.userId = decoded.user_id;
      next();
    } catch (err) {
      return res.status(401).json({
        message: 'User not authenticated. Please log in and try again.',
      });
    }
  };
}

function adminOnly() {
  return (req, res, next) => {
    const token = req.headers.authorization;
    const user = jwt.decode(token, { complete: true });
    const { user_type } = user.payload;
    if (user_type === 'admin') {
      next();
    } else {
      return res.status(401).json({
        message: 'Admin access only.',
      });
    }
  };
}

module.exports = { authenticate, adminOnly };
