const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usersModel = require('../users/users-model');
const secrets = require('../config/secrets');
const { validateUser } = require('../middleware/validate');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const hash = async password => await bcrypt.hash(password, 14);
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: `${await hash(req.body.password)}`,
      user_type: req.body.user_type,
      org_id: req.body.org_id,
    };
    const user = await usersModel.add(newUser);

    // return token
    const token = signToken(user);

    res.status(201).json({
      message: `Welcome, ${user.username}`,
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', validateUser(), async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await usersModel.getBy({ username }).first();
    if (!user) {
      res.status(401).json({
        message: 'Username not found',
      });
    } else {
      const passwordValid = await bcrypt.compare(password, user.password);

      if (user && passwordValid) {
        const token = signToken(user);

        res.status(200).json({
          message: `Welcome, ${user.username}`,
          user: {
            id: user.id,
            username: user.username,
            user_type: user.user_type,
            org_id: user.org_id,
          },
          token,
        });
      } else {
        res.status(401).json({
          message: 'Invalid password',
        });
      }
    }
  } catch (error) {
    next(error);
  }
});

// this function creates and signs the token
function signToken(user) {
  const payload = {
    user_id: user.id,
    username: user.username,
    user_type: user.user_type,
    org_id: user.org_id,
  };

  const secret = secrets.jwt;

  const options = {
    expiresIn: '7d',
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
