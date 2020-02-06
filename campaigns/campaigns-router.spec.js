const supertest = require('supertest');
const server = require('../index');
const db = require('../data/config');

const orgToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6ImNhcm9sIiwidXNlcl90eXBlIjoib3JnYW5pemF0aW9uIiwib3JnX2lkIjoxLCJpYXQiOjE1ODA4NzcxMTksImV4cCI6MTU4MTQ4MTkxOX0.nbxO4Z_gqoi7w8nfaQvkzm9EjFke4QoSdOLGaK3vFpE';

beforeEach(async () => {
  await db.seed.run();
});

test('GET / - get campaigns', async () => {
  // get campaigns
  const res = await supertest(server).get('/api/campaigns');

  // does it return the expected status code?
  expect(res.status).toBe(200);

  // does it return the expected data format?
  expect(res.type).toBe('application/json');

  // does it return the expected data?
  expect(res.body.length).toBe(7);
});

test('GET /:id - get campaign by id', async () => {
  // get campaign
  const res = await supertest(server).get('/api/campaigns/1');

  // does it return the expected status code?
  expect(res.status).toBe(200);

  // does it return the expected data format?
  expect(res.type).toBe('application/json');

  // does it return the expected data?
  expect(res.body.id).toBe(1);
  expect(res.body.title).toMatch(
    /conserving migrating raptors in western georgia/i
  );
  expect(res.body.org_id).toBe(1);
});

test('POST /:id - add new campaign', async () => {
  // update campaign
  const res = await supertest(server)
    .post('/api/campaigns')
    .set({ Authorization: orgToken })
    .send({
      title: 'test',
      description: 'test',
      photo_url: 'test',
      location: 'test',
      species: 'test',
      urgency_level: 1,
      funding_goal: 1,
      deadline: '12-31-2020',
    });

  // does it return the expected status code?
  expect(res.status).toBe(201);

  // does it return the expected data format?
  expect(res.type).toBe('application/json');

  // does it return the expected data?
  expect(res.body[0].title).toMatch(/test/i);
  expect(res.body[0].id).toBe(8);
  expect(res.body[0].org_id).toBe(1);

  const campaigns = await db('campaigns');
  expect(campaigns).toHaveLength(8);
});

test('PUT /:id - update campaign by id', async () => {
  // update campaign
  const res = await supertest(server)
    .put('/api/campaigns/1')
    .set({ Authorization: orgToken })
    .send({
      title: 'test',
      description: 'test',
      photo_url: 'test',
      location: 'test',
      species: 'test',
      urgency_level: 1,
      funding_goal: 1,
      deadline: '12-31-2020',
    });

  // does it return the expected status code?
  expect(res.status).toBe(200);

  // does it return the expected data format?
  expect(res.type).toBe('application/json');

  // does it return the expected data?
  expect(res.body[0].title).toMatch(/test/i);
  expect(res.body[0].id).toBe(1);
  expect(res.body[0].org_id).toBe(1);
});

test('DELETE /:id - delete campaign by id', async () => {
  // delete campaign
  const res = await supertest(server)
    .delete('/api/campaigns/1')
    .set({ Authorization: orgToken });

  // does it return the expected status code?
  expect(res.status).toBe(204);

  // does it return the expected data format?
  expect(res.type).toBe('');

  // does it return the expected data?
  const campaigns = await db('campaigns');
  expect(campaigns).toHaveLength(6);
});
