const express = require('express');
const usersModel = require('../users/users-model');
const { authenticate, adminOnly } = require('../middleware/authenticate');
const { validateUserId } = require('../middleware/validate');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.get('/', authenticate(), adminOnly(), async (req, res, next) => {
  try {
    const users = await usersModel.get();
    return res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', authenticate(), validateUserId(), async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = jwt.decode(token, { complete: true });
    const { user_type, user_id } = user.payload;
    if (user_type === 'admin' || user_id == req.params.id) {
      return res.json(req.user);
    } else {
      return res.status(401).json({
        message: 'Access denied.',
      });
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:id', authenticate(), validateUserId(), async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = jwt.decode(token, { complete: true });
    const { user_type, user_id } = user.payload;
    if (user_type === 'admin' || user_id == req.params.id) {
      const hash = async password => await bcrypt.hash(password, 14);
      const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: `${await hash(req.body.password)}`,
        user_type: req.body.user_type,
        org_id: req.body.org_id,
      };
      const user = await usersModel.update(req.params.id, newUser);
      res.status(200).json(user);
    } else {
      return res.status(401).json({
        message: 'Access denied.',
      });
    }
  } catch (err) {
    next(err);
  }
});

router.delete(
  '/:id',
  authenticate(),
  adminOnly(),
  validateUserId(),
  async (req, res, next) => {
    try {
      await usersModel.del(req.params.id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/:id/favorites',
  authenticate(),
  validateUserId(),
  async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const user = jwt.decode(token, { complete: true });
      const { user_type, user_id } = user.payload;
      if (user_type === 'supporter' && user_id == req.params.id) {
        const campaign = await usersModel.getFavoriteCampaigns(req.params.id);
        req.user.favorite_campaigns = campaign;
        return res.status(201).json(req.user);
      } else {
        return res.status(401).json({
          message: 'Access denied.',
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/:id/favorites',
  authenticate(),
  validateUserId(),
  async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const user = jwt.decode(token, { complete: true });
      const { user_type, user_id } = user.payload;
      if (user_type === 'supporter' && user_id == req.params.id) {
        const newFavorite = {
          user_id,
          campaign_id: req.body.campaign_id,
        };
        const campaign = await usersModel.addFavoriteCampaign(newFavorite);
        return res.status(201).json(campaign);
      } else {
        return res.status(401).json({
          message: 'Access denied.',
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/:id/favorites/:campaignId',
  authenticate(),
  validateUserId(),
  async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const user = jwt.decode(token, { complete: true });
      const { user_type, user_id } = user.payload;
      if (user_type === 'supporter' && user_id == req.params.id) {
        await usersModel.delFavoriteCampaign(
          req.params.id,
          req.params.campaignId
        );
        res.status(204).end();
      } else {
        return res.status(401).json({
          message: 'Access denied.',
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
