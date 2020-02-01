exports.up = async function(knex) {
  await knex.schema.createTable('campaigns', table => {
    table.increments();
    table.string('title').notNullable();
    table.text('description');
    table.string('photo_url');
    table.string('location').notNullable();
    table.string('species').notNullable();
    table.integer('urgency_level').notNullable();
    table.integer('funding_goal');
    table.date('deadline');
    table
      .integer('org_id')
      .notNullable()
      .references('id')
      .inTable('organizations')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });

  await knex.schema.createTable('users_campaigns', table => {
    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .integer('campaign_id')
      .notNullable()
      .references('id')
      .inTable('campaigns')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.primary(['user_id', 'campaign_id']);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('users_campaigns');
  await knex.schema.dropTableIfExists('campaigns');
};
