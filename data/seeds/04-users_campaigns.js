exports.seed = function(knex) {
  return knex('users_campaigns').insert([
    { user_id: 5, campaign_id: 1 },
    { user_id: 5, campaign_id: 3 },
    { user_id: 5, campaign_id: 4 },
    { user_id: 9, campaign_id: 1 },
    { user_id: 9, campaign_id: 5 },
  ]);
};
