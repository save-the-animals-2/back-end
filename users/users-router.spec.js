const supertest = require('supertest');
const server = require('../index');
const db = require('../data/config');

const adminToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxMSwidXNlcm5hbWUiOiJ0ZXN0IiwidXNlcl90eXBlIjoiYWRtaW4iLCJpYXQiOjE1ODA0Mzc4ODIsImV4cCI6MTU4MTA0MjY4Mn0.cAqRl4Qifw0Y8htim0HTRd7Kw8hiW6ydZd_QkaZ5A8U';

beforeEach(async () => {
  await db.seed.run();
});

test('GET / - get users', async () => {
  // get users
  const res = await supertest(server)
    .get('/api/users')
    .set({ Authorization: adminToken });

  // does it return the expected status code?
  expect(res.status).toBe(200);

  // does it return the expected data format?
  expect(res.type).toBe('application/json');

  // does it return the expected data?
  expect(res.body.length).toBe(10);
});

test('GET /:id - get user by id', async () => {
  // get user
  const res = await supertest(server)
    .get('/api/users/1')
    .set({ Authorization: adminToken });

  // does it return the expected status code?
  expect(res.status).toBe(200);

  // does it return the expected data format?
  expect(res.type).toBe('application/json');

  // does it return the expected data?
  expect(res.body.id).toBe(1);
  expect(res.body.username).toMatch(/ruth/i);
  expect(res.body.email).toMatch(/ruth@dev.biz/i);
  expect(res.body.user_type).toMatch(/admin/i);
  expect(res.body.org_id).toBeNull();
});

test('PUT /:id - update user by id', async () => {
  // update user
  const res = await supertest(server)
    .put('/api/users/1')
    .set({ Authorization: adminToken })
    .send({
      username: 'test',
      email: 'test@test.biz',
      password: 'abc123',
      user_type: 'admin',
    });

  // does it return the expected status code?
  expect(res.status).toBe(200);

  // does it return the expected data format?
  expect(res.type).toBe('application/json');

  // does it return the expected data?
  expect(res.body[0].username).toMatch(/test/i);
  expect(res.body[0].email).toMatch(/test@test.biz/i);
  expect(res.body[0].user_type).toMatch(/admin/i);
  expect(res.body[0].org_id).toBeNull();
});

test('DELETE /:id - delete user by id', async () => {
  // delete user
  const res = await supertest(server)
    .delete('/api/users/1')
    .set({ Authorization: adminToken });

  // does it return the expected status code?
  expect(res.status).toBe(204);

  // does it return the expected data format?
  expect(res.type).toBe('');

  // does it return the expected data?
  const users = await db('users');
  expect(users).toHaveLength(9);
});
