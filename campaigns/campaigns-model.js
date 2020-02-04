const db = require('../data/config');

function get() {
  return db('campaigns as c')
    .join('organizations as o', 'c.org_id', 'o.id')
    .select(
      'c.id',
      'c.title',
      'c.description',
      'c.photo_url',
      'c.location',
      'c.species',
      'c.urgency_level',
      'c.funding_goal',
      'c.deadline',
      'c.org_id',
      'o.name as org_name'
    );
}

function getById(campaign_id) {
  return db('campaigns as c')
    .join('organizations as o', 'c.org_id', 'o.id')
    .select(
      'c.id',
      'c.title',
      'c.description',
      'c.photo_url',
      'c.location',
      'c.species',
      'c.urgency_level',
      'c.funding_goal',
      'c.deadline',
      'c.org_id',
      'o.name as org_name'
    )
    .where({ 'c.id': campaign_id })
    .first();
}

function add(campaign) {
  return db('campaigns')
    .insert(campaign)
    .returning('*');
}

function update(id, changes) {
  return db('campaigns')
    .where({ id })
    .update(changes)
    .returning('*');
}

function del(id) {
  return db('campaigns')
    .where({ id })
    .del();
}

function getOrgCampaigns(org_id) {
  return db('campaigns as c')
    .join('organizations as o', 'c.org_id', 'o.id')
    .select(
      'c.id',
      'c.title',
      'c.description',
      'c.photo_url',
      'c.location',
      'c.species',
      'c.urgency_level',
      'c.funding_goal',
      'c.deadline',
      'c.org_id',
      'o.name as org_name'
    )
    .where({ 'o.id': org_id });
}

module.exports = {
  get,
  getById,
  add,
  update,
  del,
  getOrgCampaigns,
};
