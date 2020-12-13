require('dotenv').config();
const request = require('supertest');
const fs  = require('fs');
const pool = require('../lib/utils/pool');
const app = require('../lib/app');
const Tea = require('../lib/models/Tea');
// const data = require('../data/setup.sql');
// `${__dirname}/../data/setup.sql`

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

  it('GETs tea by id', async() => {
    const tea = await Tea.insert({
      type: 'black',
      name: 'Red Dawn',
      origin: 'China' 
    });

    const response = await request(app)
      .get(`/api/v1/tea/${tea.id}`);
    
    expect(response.body).toEqual(tea);
  });

  it('GETs all tea', async() => {
    const teas = await Promise.all([
      {
        type: 'black',
        name: 'Red Dawn',
        origin: 'China',
      },
      {
        type: 'green',
        name: 'Green Mao Jian',
        origin: 'China',
      },
      {
        type: 'Hibiscus',
        name: 'Vanilla Red',
        origin: 'Hawaii',
      }
    ].map(tea => Tea.insert(tea)));

    const res = await request(app)
      .get('/api/v1/tea');
    
    expect(res.body).toEqual(expect.arrayContaining(teas));
    expect(res.body).toHaveLength(teas.length);
  });

  it('PUTs an update to tea by id', async() => {
    const tea = await Tea.insert({
      type: 'green',
      name: 'Green Mao Jian',
      origin: 'China' 
    });

    const response = await request(app)
      .put(`/api/v1/tea/${tea.id}`)
      .send({
        type: 'black',
        name: 'Red Dawn',
        origin: 'China' 
      });

    expect(response.body).toEqual({
      ...tea,
      type: 'black',
      name: 'Red Dawn',
      origin: 'China'
    });
  });
  
  it('DELETES tea by id', async() => {
    const tea = await Tea.insert({
      type: 'black',
      name: 'Red Dawn',
      origin: 'China' 
    });
    
    const response = await request(app)
      .delete(`/api/v1/tea/${tea.id}`);

    expect(response.body).toEqual({});
  });
  
});
