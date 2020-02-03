const express = require('express');
const usersModel = require('../users/users-model');
const authenticate = require('../middleware/authenticate');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/', authenticate(), async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = jwt.decode(token, { complete: true });
    const { user_type } = user.payload;
    if (user_type === 'admin') {
      const users = await usersModel.get();
      return res.json(users);
    } else {
      return res.status(401).json({
        message: 'Admin access only.',
      });
    }
  } catch (err) {
    next(err);
  }
});

router.get('/:id', authenticate(), async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = jwt.decode(token, { complete: true });
    const { user_type, user_id } = user.payload;
    if (user_type === 'admin' || user_id == req.params.id) {
      const user = await usersModel.get(req.params.id);
      return res.json(user);
    } else {
      return res.status(401).json({
        message: 'Access denied.',
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
