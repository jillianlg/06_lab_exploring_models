const { request } = require('express');
const app = require('./lib/app');

describe('app tests', () => {
  it('test criteria', () => {
    return request(app);
  });
});
