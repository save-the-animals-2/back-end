const express = require('express');
const organizationsModel = require('./organizations-model');
const campaignsModel = require('../campaigns/campaigns-model');
const { authenticate, adminOnly } = require('../middleware/authenticate');
const { validateOrganizationId } = require('../middleware/validate');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const organizations = await organizationsModel.get();
    res.status(200).json(organizations);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', validateOrganizationId(), async (req, res, next) => {
  try {
    const campaigns = await campaignsModel.getOrgCampaigns(req.params.id);
    res.status(200).json(campaigns);
  } catch (err) {
    next(err);
  }
});

router.post('/', authenticate(), adminOnly(), async (req, res, next) => {
  try {
    const newOrganization = {
      name: req.body.name,
    };
    const organization = await organizationsModel.add(newOrganization);
    return res.status(201).json(organization);
  } catch (err) {
    next(err);
  }
});

router.put(
  '/:id',
  authenticate(),
  adminOnly(),
  validateOrganizationId(),
  async (req, res, next) => {
    try {
      const newOrganization = {
        name: req.body.name,
      };
      const organization = await organizationsModel.update(
        req.params.id,
        newOrganization
      );
      res.status(200).json(organization);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/:id',
  authenticate(),
  adminOnly(),
  validateOrganizationId(),
  async (req, res, next) => {
    try {
      await organizationsModel.del(req.params.id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
