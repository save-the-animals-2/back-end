const db = require('../data/config');
const usersModel = require('./users-model');

beforeEach(async () => {
  await db.seed.run();
});

describe('users model', () => {
  test('get', async () => {
    const res = await usersModel.get();
    expect(res).toHaveLength(10);
  });

  test('get with id', async () => {
    const res = await usersModel.get(1);
    expect(res.id).toBe(1);
    expect(res.username).toMatch(/ruth/i);
    expect(res.password).not.toBeNull();
  });
});
