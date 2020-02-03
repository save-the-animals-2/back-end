const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usersModel = require('../users/users-model');
const secrets = require('../config/secrets');
const { validateUser } = require('../middleware/validate');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      user_type: req.body.user_type,
      org_id: req.body.org_id,
    };
    const user = await usersModel.add(newUser);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/login', validateUser(), async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await usersModel.getBy({ username }).first();
    const passwordValid = await bcrypt.compare(password, user.password);

    if (user && passwordValid) {
      const token = signToken(user);

      res.status(200).json({
        message: 'Logged in',
        user: user.id,
        token,
      });
    } else {
      res.status(401).json({
        message: 'Invalid credentials, please check your username and password',
      });
    }
  } catch (error) {
    next(error);
  }
});

// this function creates and signs the token
function signToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    user_type: user.user_type,
  };

  const secret = secrets.jwt;

  const options = {
    expiresIn: '7d',
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
