const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Dog = require('../lib/models/Dog');

describe('any-api routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should be able to create a dog', async () => {
    const expected = {
      name: 'Watson',
      age: 7,
    };
    const res = await request(app).post('/api/v1/dogs').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('get all the dogs', async () => {
    const expected = await Dog.findAll();
    const res = await request(app).get('/api/v1/dogs');

    expect(res.body).toEqual(expected);
  });

  it('get dog by ID', async () => {
    const dog = { name: 'Watson', age: 7 };
    const expected = await Dog.insert(dog);
    const res = await request(app).get(`/api/v1/dogs/${expected.id}`);

    expect(res.body).toEqual(expected);
  });

  it('updates a dog', async () => {
    const initial = { name: 'Watson', age: 7 };

    const dog = await Dog.insert(initial);

    const res = await request(app)
      .patch(`/api/v1/dogs/${dog.id}`)
      .send({ age: 6 });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Watson',
      age: 6,
    });
  });

  it('deletes a dog', async () => {
    const initial = { name: 'Watson', age: 7 };

    const dog = await Dog.insert(initial);

    const res = await request(app).delete(`/api/v1/dogs/${dog.id}`);

    expect(res.body).toEqual(dog);
  });
});
