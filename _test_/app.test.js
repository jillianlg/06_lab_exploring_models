const { request } = require('express');
// const { Pool } = require('pg');
// const request = require('supertest');
// const pool = require('../lib/utils/pool');
const app = require('./lib/app');


describe('app tests', () => {
  // beforeEach(() => {
  //   return pool.query(fs.readFileSync('./data/setup.sql', 'utf-8'))
  // });

  // afterAll(() => {
  //   return pool.end();
  // });

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
});