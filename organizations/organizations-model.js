const db = require('../data/config');

function get() {
  return db('organizations');
}

function getById(id) {
  return db('organizations')
    .where({ id })
    .first();
}

function add(organization) {
  return db('organizations')
    .insert(organization)
    .returning('*');
}

function update(id, changes) {
  return db('organizations')
    .where({ id })
    .update(changes)
    .returning('*');
}

function del(id) {
  return db('organizations')
    .where({ id })
    .del();
}

module.exports = {
  get,
  getById,
  add,
  update,
  del,
};
