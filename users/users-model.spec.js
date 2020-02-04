const db = require('../data/config');
const usersModel = require('./users-model');

beforeEach(async () => {
  await db.seed.run();
});

describe('users model', () => {
  test('get users', async () => {
    const res = await usersModel.get();
    expect(res).toHaveLength(10);
  });

  test('get user by id', async () => {
    const res = await usersModel.get(1);
    expect(res.id).toBe(1);
    expect(res.username).toMatch(/ruth/i);
    expect(res.password).not.toBeNull();
  });

  test('add user', async () => {
    const res = await usersModel.add({
      username: 'test',
      email: 'test@test.com',
      password: 'abc123',
      user_type: 'admin',
    });
    expect(res.id).toBe(11);
    expect(res.username).toMatch(/test/i);
    expect(res.email).toMatch(/test@test.com/i);
    expect(res.password).not.toBeNull();
    expect(res.user_type).toMatch(/admin/i);

    const users = await db('users');
    expect(users).toHaveLength(11);
  });

  test('delete user', async () => {
    await usersModel.del(4);

    const users = await db('users');
    expect(users).toHaveLength(9);
  });
});
