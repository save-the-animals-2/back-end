const express = require('express');
const organizationsModel = require('./organizations-model');
const campaignsModel = require('../campaigns/campaigns-model');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const organizations = await organizationsModel.get();
    res.status(200).json(organizations);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const organization = await organizationsModel.getById(req.params.id);
    res.status(200).json(organization);
  } catch (err) {
    next(err);
  }
});

router.post('/', authenticate(), async (req, res, next) => {
  try {
    const organization = await organizationsModel.add(req.body);
    res.status(201).json(organization);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', authenticate(), async (req, res, next) => {
  try {
    const organization = await organizationsModel.update(
      req.params.id,
      req.body
    );
    res.status(200).json(organization);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', authenticate(), async (req, res, next) => {
  try {
    await organizationsModel.del(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

router.get('/:id/campaigns', async (req, res, next) => {
  try {
    const campaign = await campaignsModel.getOrgCampaigns(req.params.id);
    res.status(200).json(campaign);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
