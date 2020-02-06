const db = require('../data/config');
const organizationsModel = require('./organizations-model');

beforeEach(async () => {
  await db.seed.run();
});

describe('organizations model', () => {
  test('get organizations', async () => {
    const res = await organizationsModel.get();
    expect(res).toHaveLength(4);
  });

  test('get organization by id', async () => {
    const res = await organizationsModel.getById(1);
    expect(res.id).toBe(1);
    expect(res.name).toMatch(/fauna and flora international/i);
  });

  test('add organization', async () => {
    const [res] = await organizationsModel.add({
      name: 'test',
    });
    expect(res.id).toBe(5);
    expect(res.name).toMatch(/test/i);

    const organizations = await db('organizations');
    expect(organizations).toHaveLength(5);
  });

  test('delete organization', async () => {
    await organizationsModel.del(4);

    const organizations = await db('organizations');
    expect(organizations).toHaveLength(3);
  });
});
