const supertest = require('supertest');
const server = require('../index');
const db = require('../data/config');

beforeEach(async () => {
  await db.seed.run();
});

test('POST /register - create new user', async () => {
  // create user
  const res = await await supertest(server)
    .post('/api/register')
    .send({
      username: 'test',
      email: 'test@test.biz',
      password: 'abc123',
      user_type: 'admin',
    });

  // does it return the expected status code?
  expect(res.status).toBe(201);

  // does it return the expected data format?
  expect(res.type).toBe('application/json');

  // does it return the expected data?
  expect(res.id).toBe(11);
  expect(res.username).toMatch(/test/i);
  expect(res.email).toMatch(/test@test.biz/i);
  expect(res.password).not.toBeNull();
  expect(res.user_type).toMatch(/admin/i);

  const users = await db('users');
  expect(users).toHaveLength(11);
});
