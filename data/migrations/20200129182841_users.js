exports.up = async function(knex) {
  await knex.schema.createTable('organizations', table => {
    table.increments('id');
    table
      .string('name')
      .notNullable()
      .unique();
  });

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
    table
      .integer('org_id')
      .references('id')
      .inTable('organizations')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('users');
  await knex.schema.dropTableIfExists('organizations');
};
