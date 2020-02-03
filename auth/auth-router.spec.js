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
  expect(res.body.username).toMatch(/test/i);
  expect(res.body.email).toMatch(/test@test.biz/i);
  expect(res.body.user_type).toMatch(/admin/i);
  expect(res.body.org_id).toBeNull();

  const users = await db('users');
  expect(users).toHaveLength(11);
});

test('POST /login - login user route', async () => {
  // create user
  const res = await await supertest(server)
    .post('/api/login')
    .send({
      username: 'carol',
      password: '123abc',
    });

  // does it return the expected status code?
  expect(res.status).toBe(200);

  // does it return the expected data format?
  expect(res.type).toBe('application/json');

  // does it return the expected data?
  expect(res.body.message).toMatch(/logged in/i);
  expect(res.body.user).not.toBeNull();
  expect(res.body.token).not.toBeNull();
});
