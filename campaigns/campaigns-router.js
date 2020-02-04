const express = require('express');
const jwt = require('jsonwebtoken');
const campaignsModel = require('./campaigns-model');
const { authenticate } = require('../middleware/authenticate');
const { validateCampaignId } = require('../middleware/validate');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const campaigns = await campaignsModel.get();
    res.status(200).json(campaigns);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', validateCampaignId(), async (req, res, next) => {
  try {
    res.status(200).json(req.campaign);
  } catch (err) {
    next(err);
  }
});

router.post('/', authenticate(), async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = jwt.decode(token, { complete: true });
    const { user_type, org_id } = user.payload;
    if (user_type === 'organization') {
      const newCampaign = {
        title: req.body.title,
        description: req.body.description,
        photo_url: req.body.photo_url,
        location: req.body.location,
        species: req.body.species,
        urgency_level: req.body.urgency_level,
        funding_goal: req.body.funding_goal,
        deadline: req.body.deadline,
        org_id,
      };
      const campaign = await campaignsModel.add(newCampaign);
      return res.status(201).json(campaign);
    } else {
      return res.status(401).json({
        message: 'Access denied.',
      });
    }
  } catch (err) {
    next(err);
  }
});

router.put(
  '/:id',
  authenticate(),
  validateCampaignId(),
  async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const user = jwt.decode(token, { complete: true });
      const { user_type, org_id } = user.payload;
      const campaignOrg = req.campaign.org_id;
      if (user_type === 'organization' && org_id == campaignOrg) {
        const newCampaign = {
          title: req.body.title,
          description: req.body.description,
          photo_url: req.body.photo_url,
          location: req.body.location,
          species: req.body.species,
          urgency_level: req.body.urgency_level,
          funding_goal: req.body.funding_goal,
          deadline: req.body.deadline,
          org_id: campaignOrg,
        };
        const campaign = await campaignsModel.update(
          req.params.id,
          newCampaign
        );
        res.status(200).json(campaign);
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
  '/:id',
  authenticate(),
  validateCampaignId(),
  async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const user = jwt.decode(token, { complete: true });
      const { user_type, org_id } = user.payload;
      const campaignOrg = req.campaign.org_id;
      if (user_type === 'organization' && org_id == campaignOrg) {
        await campaignsModel.del(req.params.id);
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
