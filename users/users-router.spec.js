const supertest = require('supertest');
const server = require('../index');

test('GET / - get users', async () => {
  // get users
  const res = await supertest(server).get('/api/users');

  // does it return the expected status code?
  expect(res.status).toBe(200);

  // does it return the expected data format?
  expect(res.type).toBe('application/json');

  // does it return the expected data?
  expect(res.body.length).toBe(10);
});

test('GET /:id - get user by id', async () => {
  // get users
  const res = await supertest(server).get('/api/users/1');

  // does it return the expected status code?
  expect(res.status).toBe(200);

  // does it return the expected data format?
  expect(res.type).toBe('application/json');

  // does it return the expected data?
  expect(res.body.id).toBe(1);
  expect(res.body.username).toMatch(/ruth/i);
  expect(res.body.email).toMatch(/ruth@dev.biz/i);
  expect(res.body.user_type).toMatch(/admin/i);
});
