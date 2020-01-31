exports.seed = async knex => {
  await knex('users').truncate();
  await knex('organizations').truncate();
};
