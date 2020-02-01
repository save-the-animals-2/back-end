const db = require('../data/config');

function get() {
  return db('organizations');
}

function getById(id) {
  return db('organizations')
    .where({ id })
    .first();
}

async function add(organization) {
  const [id] = await db('organizations').insert(organization);

  return getById(id);
}

async function update(id, changes) {
  await db('organizations')
    .where({ id })
    .update(changes);

  return getById(id);
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
