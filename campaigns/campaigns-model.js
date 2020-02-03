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

async function add(campaign) {
  const [id] = await db('campaigns').insert(campaign);

  return getById(id);
}

async function update(id, changes) {
  await db('campaigns')
    .where({ id })
    .update(changes);

  return getById(id);
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
