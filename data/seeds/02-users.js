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
      org_id: 1,
    },
    {
      username: 'olivia',
      email: 'olivia@fauna-flora.org',
      password: `${await hash('123abc')}`,
      user_type: 'organization',
      org_id: 1,
    },
    {
      username: 'brienne',
      email: 'brienne@aws.org.au',
      password: `${await hash('123abc')}`,
      user_type: 'organization',
      org_id: 2,
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
      org_id: 3,
    },
    {
      username: 'tessa',
      email: 'tessa@awf.org',
      password: `${await hash('123abc')}`,
      user_type: 'organization',
      org_id: 3,
    },
    {
      username: 'edgar',
      email: 'edgar@awf.org',
      password: `${await hash('123abc')}`,
      user_type: 'organization',
      org_id: 3,
    },
    {
      username: 'neil',
      email: 'neillovesdogs@gmail.com',
      password: `${await hash('123abc')}`,
      user_type: 'supporter',
    },
    {
      username: 'david',
      email: 'david@panthera.org',
      password: `${await hash('123abc')}`,
      user_type: 'organization',
      org_id: 4,
    },
  ]);
};
