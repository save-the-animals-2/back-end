exports.seed = async knex => {
  await knex('users_campaigns').truncate();
  await knex('campaigns').truncate();
  await knex('users').truncate();
  await knex('organizations').truncate();
};
