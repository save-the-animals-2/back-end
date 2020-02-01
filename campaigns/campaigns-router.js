const express = require('express');
const campaignsModel = require('./campaigns-model');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const campaigns = await campaignsModel.get();
    res.status(200).json(campaigns);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const campaign = await campaignsModel.getById(req.params.id);
    res.status(200).json(campaign);
  } catch (err) {
    next(err);
  }
});

router.post('/', authenticate(), async (req, res, next) => {
  try {
    const campaign = await campaignsModel.add(req.body);
    res.status(201).json(campaign);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', authenticate(), async (req, res, next) => {
  try {
    const campaign = await campaignsModel.update(req.params.id, req.body);
    res.status(200).json(campaign);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', authenticate(), async (req, res, next) => {
  try {
    await campaignsModel.del(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
