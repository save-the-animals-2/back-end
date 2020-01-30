exports.seed = async knex => {
  await knex('users_organizations').truncate();
  await knex('organizations').truncate();
  await knex('users').truncate();
};
