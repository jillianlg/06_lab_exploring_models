const request = require('supertest');
const fs  = require('fs');
const pool = require('../lib/utils/pool');
const app = require('./lib/app');
const Tea = require('../lib/models/Tea');


describe('app tests', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./data/setup.sql', 'utf-8'));
  });

  afterAll(() => {

    return pool.end();
  });

  it('POSTs a tea to the table', async() => {
    const response = await request(app)
      .post('/api/v1/tea')
      .send({
        type: 'black',
        name: 'Red Dawn',
        origin: 'China'
      });
      
    expect(response.body).toEqual({
      id: '1',
      type: 'black',
      name: 'Red Dawn',
      origin: 'China'
    });
  });

  it('GETS tea by id', async() => {
    const tea = await Tea.insert({
      type: 'black',
      name: 'Red Dawn',
      origin: 'China' 
    });

    const response = await request(app)
      .get(`/api/v1/tea/${tea.id}`);
    
    expect(response.body).toEqual(tea);
  });
});
