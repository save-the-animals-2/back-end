const db = require('../data/config');
const bcrypt = require('bcryptjs');

function get(id) {
  let query = db('users');

  if (id) {
    return query
      .where({ id })
      .first('id', 'username', 'email', 'user_type', 'org_id');
  } else {
    return query.select('id', 'username', 'email', 'user_type', 'org_id');
  }
}

function getBy(filter) {
  return db('users')
    .where(filter)
    .select('id', 'username', 'password', 'user_type', 'org_id');
}

async function add(user) {
  user.password = await bcrypt.hash(user.password, 14);
  const [id] = await db('users').insert(user);

  return get(id);
}

async function update(id, user) {
  user.password = await bcrypt.hash(user.password, 14);
  await db('users')
    .where({ id })
    .update(user);

  return get(id);
}

function del(id) {
  return db('users')
    .where({ id })
    .del();
}

module.exports = {
  get,
  getBy,
  add,
  update,
  del,
};
