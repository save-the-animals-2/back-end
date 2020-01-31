const bcrypt = require('bcryptjs');
const hash = async password => await bcrypt.hash(password, 10);
exports.seed = async function(knex) {
  await knex('users').insert([
    {
      username: 'ruth',
      email: 'ruth@dev.biz',
      password: `${await hash('123abc')}`,
      user_type: 'admin',
    },
    {
      username: 'carol',
      email: 'carol@fauna-flora.org',
      password: `${await hash('123abc')}`,
      user_type: 'organization',
    },
    {
      username: 'olivia',
      email: 'olivia@fauna-flora.org',
      password: `${await hash('123abc')}`,
      user_type: 'organization',
    },
    {
      username: 'brienne',
      email: 'brienne@aws.org.au',
      password: `${await hash('123abc')}`,
      user_type: 'organization',
    },
    {
      username: 'eric',
      email: 'ericsavestheplanet@gmail.com',
      password: `${await hash('123abc')}`,
      user_type: 'supporter',
    },
    {
      username: 'rachel',
      email: 'rachel@awf.org',
      password: `${await hash('123abc')}`,
      user_type: 'organization',
    },
    {
      username: 'tessa',
      email: 'tessa@awf.org',
      password: `${await hash('123abc')}`,
      user_type: 'organization',
    },
    {
      username: 'edgar',
      email: 'edgar@awf.org',
      password: `${await hash('123abc')}`,
      user_type: 'organization',
    },
    {
      username: 'neil',
      email: 'neillovesdogs@gmail.com',
      password: `${await hash('123abc')}`,
      user_type: 'supporter',
    },
    {
      username: 'david',
      email: 'david@wildlifejustice.org',
      password: `${await hash('123abc')}`,
      user_type: 'organization',
    },
  ]);
};
