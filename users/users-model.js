const db = require('../data/config');

function get(id) {
  let query = db('users');

  if (id) {
    return query
      .where({ id })
      .first('id', 'username', 'email', 'user_type', 'org_id');
  } else {
    return query.select('id', 'username', 'email', 'user_type', 'org_id');
  }
}

function getBy(filter) {
  return db('users')
    .where(filter)
    .select('id', 'username', 'password', 'user_type', 'org_id');
}

function add(user) {
  return db('users')
    .insert(user)
    .returning('*');
}

function update(id, user) {
  return db('users')
    .where({ id })
    .update(user)
    .returning('*');
}

function del(id) {
  return db('users')
    .where({ id })
    .del();
}

function getFavoriteCampaigns(user_id) {
  return db('users as u')
    .join('users_campaigns as uc', 'u.id', 'uc.user_id')
    .join('campaigns as c', 'c.id', 'uc.campaign_id')
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
      'c.org_id'
    )
    .where({ 'u.id': user_id });
}

function addFavoriteCampaign(campaign) {
  return db('users_campaigns')
    .insert(campaign)
    .returning('*');
}

function delFavoriteCampaign(user_id, campaign_id) {
  return db('users_campaigns')
    .where({ user_id })
    .where({ campaign_id })
    .first()
    .del();
}

module.exports = {
  get,
  getBy,
  add,
  update,
  del,
  getFavoriteCampaigns,
  addFavoriteCampaign,
  delFavoriteCampaign,
};
