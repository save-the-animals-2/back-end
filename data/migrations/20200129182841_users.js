exports.up = async function(knex) {
  await knex.schema.createTable('users', table => {
    table.increments('id');
    table
      .string('username', 52)
      .notNullable()
      .unique();
    table
      .string('email', 255)
      .notNullable()
      .unique();
    table.string('password').notNullable();
    table.string('user_type', 15).notNullable();
  });

  await knex.schema.createTable('organizations', table => {
    table.increments('id');
    table
      .string('name')
      .notNullable()
      .unique();
  });

  await knex.schema.createTable('users_organizations', table => {
    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .integer('organization_id')
      .notNullable()
      .references('id')
      .inTable('organizations')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.primary(['user_id', 'organization_id']);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('users_organizations');
  await knex.schema.dropTableIfExists('organizations');
  await knex.schema.dropTableIfExists('users');
};
