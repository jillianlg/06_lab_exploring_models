require('dotenv').config();
const request = require('supertest');
const fs  = require('fs');
const pool = require('../lib/utils/pool');
const app = require('./lib/app');
const Tea = require('../lib/models/Tea');
// const data = require('../data/setup.sql');


describe('app tests', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync(`${__dirname}/../data/setup.sql`, 'utf-8'));
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

// please pass the damn github test
