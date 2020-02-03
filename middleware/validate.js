const usersModel = require('../users/users-model');
const organizationsModel = require('../organizations/organizations-model');
const campaignsModel = require('../campaigns/campaigns-model');

function validateUser() {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({ message: 'Missing user data.' });
    } else if (!req.body.username) {
      return res.status(400).json({ message: 'Username is required.' });
    } else if (!req.body.password) {
      return res.status(400).json({ message: 'Password is required.' });
    }
    next();
  };
}

function validateUserId() {
  return async (req, res, next) => {
    const user = await usersModel.get(req.params.id);
    try {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      next(error);
    }
  };
}

function validateOrganizationId() {
  return async (req, res, next) => {
    const organization = await organizationsModel.getById(req.params.id);
    try {
      if (organization) {
        next();
      } else {
        res.status(404).json({ message: 'Organization not found' });
      }
    } catch (error) {
      next(error);
    }
  };
}

function validateCampaignId() {
  return async (req, res, next) => {
    const campaign = await campaignsModel.getById(req.params.id);
    try {
      if (campaign) {
        req.campaign = campaign;
        next();
      } else {
        res.status(404).json({ message: 'Campaign not found' });
      }
    } catch (error) {
      next(error);
    }
  };
}

module.exports = {
  validateUser,
  validateUserId,
  validateOrganizationId,
  validateCampaignId,
};
