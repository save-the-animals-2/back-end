const supertest = require('supertest');
const server = require('../index');
const db = require('../data/config');

const adminToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxMSwidXNlcm5hbWUiOiJ0ZXN0IiwidXNlcl90eXBlIjoiYWRtaW4iLCJpYXQiOjE1ODA0Mzc4ODIsImV4cCI6MTU4MTA0MjY4Mn0.cAqRl4Qifw0Y8htim0HTRd7Kw8hiW6ydZd_QkaZ5A8U';

beforeEach(async () => {
  await db.seed.run();
});

test('GET / - get organizations', async () => {
  // get organizations
  const res = await supertest(server).get('/api/organizations');

  // does it return the expected status code?
  expect(res.status).toBe(200);

  // does it return the expected data format?
  expect(res.type).toBe('application/json');

  // does it return the expected data?
  expect(res.body.length).toBe(4);
});

test('GET /:id - get organization by id', async () => {
  // get organization
  const res = await supertest(server).get('/api/organizations/1');

  // does it return the expected status code?
  expect(res.status).toBe(200);

  // does it return the expected data format?
  expect(res.type).toBe('application/json');

  // does it return the expected data?
  expect(res.body.length).toBe(2);
  expect(res.body[0].id).toBe(1);
  expect(res.body[0].title).toMatch(
    /conserving migrating raptors in western georgia/i
  );
  expect(res.body[0].org_id).toBe(1);
});

test('POST /:id - add new organization', async () => {
  // update organization
  const res = await supertest(server)
    .post('/api/organizations')
    .set({ Authorization: adminToken })
    .send({
      name: 'test',
    });

  // does it return the expected status code?
  expect(res.status).toBe(201);

  // does it return the expected data format?
  expect(res.type).toBe('application/json');

  // does it return the expected data?
  expect(res.body[0].name).toMatch(/test/i);
  expect(res.body[0].id).toBe(5);
});

test('PUT /:id - update organization by id', async () => {
  // update organization
  const res = await supertest(server)
    .put('/api/organizations/1')
    .set({ Authorization: adminToken })
    .send({
      name: 'test',
    });

  // does it return the expected status code?
  expect(res.status).toBe(200);

  // does it return the expected data format?
  expect(res.type).toBe('application/json');

  // does it return the expected data?
  expect(res.body[0].name).toMatch(/test/i);
  expect(res.body[0].id).toBe(1);
});

test('DELETE /:id - delete user by id', async () => {
  // delete user
  const res = await supertest(server)
    .delete('/api/organizations/1')
    .set({ Authorization: adminToken });

  // does it return the expected status code?
  expect(res.status).toBe(204);

  // does it return the expected data format?
  expect(res.type).toBe('');

  // does it return the expected data?
  const organizations = await db('organizations');
  expect(organizations).toHaveLength(3);
});
