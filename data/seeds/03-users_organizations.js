exports.seed = function(knex) {
  return knex('users_organizations').insert([
    { user_id: 2, organization_id: 1 },
    { user_id: 3, organization_id: 1 },
    { user_id: 4, organization_id: 2 },
    { user_id: 6, organization_id: 3 },
    { user_id: 7, organization_id: 3 },
    { user_id: 8, organization_id: 3 },
    { user_id: 10, organization_id: 4 },
  ]);
};
