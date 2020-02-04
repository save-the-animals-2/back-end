exports.seed = async knex => {
  await knex('users_campaigns').del();
  await knex('campaigns').del();
  await knex('users').del();
  await knex('organizations').del();
};
