const express = require('express');
const usersModel = require('./users-model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await usersModel.get();

    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await usersModel.get(req.params.id);

    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
