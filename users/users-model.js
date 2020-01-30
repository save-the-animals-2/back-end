const db = require('../data/config');

function get(id) {
  let query = db('users');

  if (id) {
    return query.where({ id }).first('id', 'username', 'email', 'user_type');
  } else {
    return query.select('id', 'username', 'email', 'user_type');
  }
}

module.exports = {
  get,
};
