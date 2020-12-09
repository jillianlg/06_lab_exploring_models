const express = require('express');
const app = express();
const Tea = require('./models/Tea');

app.use(express.json());

// CRUD route
app.post('/api/v1/tea', (req, res) => {
  Tea
    .insert(req.body)
    .then(tea => res.send(tea));
  // console.log('hi');
});

module.exports = app;
