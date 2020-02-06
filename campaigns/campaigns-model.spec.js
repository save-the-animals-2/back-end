const db = require('../data/config');
const campaignsModel = require('./campaigns-model');

beforeEach(async () => {
  await db.seed.run();
});

describe('campaigns model', () => {
  test('get campaigns', async () => {
    const res = await campaignsModel.get();
    expect(res).toHaveLength(7);
  });

  test('get campaign by id', async () => {
    const res = await campaignsModel.getById(1);
    expect(res.id).toBe(1);
    expect(res.title).toMatch(
      /conserving migrating raptors in western georgia/i
    );
  });

  test('add campaign', async () => {
    const [res] = await campaignsModel.add({
      title: 'test',
      description: 'test',
      photo_url: 'test',
      location: 'test',
      species: 'test',
      urgency_level: 1,
      funding_goal: 1,
      deadline: '12-31-2020',
      org_id: 1,
    });
    expect(res.id).toBe(8);
    expect(res.title).toMatch(/test/i);

    const campaigns = await db('campaigns');
    expect(campaigns).toHaveLength(8);
  });

  test('delete campaign', async () => {
    await campaignsModel.del(1);

    const campaigns = await db('campaigns');
    expect(campaigns).toHaveLength(6);
  });
});
