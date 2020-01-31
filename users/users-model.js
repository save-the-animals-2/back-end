const db = require('../data/config');
const bcrypt = require('bcryptjs');

function get(id) {
  let query = db('users');

  if (id) {
    return query.where({ id }).first('id', 'username', 'email', 'user_type');
  } else {
    return query.select('id', 'username', 'email', 'user_type');
  }
}

function getBy(filter) {
  return db('users')
    .where(filter)
    .select('id', 'username', 'password', 'user_type');
}

async function add(user) {
  user.password = await bcrypt.hash(user.password, 14);
  const [id] = await db('users').insert(user);

  return get(id);
}

module.exports = {
  get,
  getBy,
  add,
};
