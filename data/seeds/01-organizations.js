exports.seed = async knex => {
  await knex('organizations').insert([
    {
      name: 'Fauna and Flora International',
    },
    {
      name: 'Australian Wildlife Society',
    },
    {
      name: 'African Wildlife Foundation',
    },
    {
      name: 'Panthera',
    },
  ]);
};
