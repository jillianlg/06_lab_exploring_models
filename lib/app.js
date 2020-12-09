require('dotenv').config();
const express = require('express');
const app = express();
const Tea = require('./models/Tea');

app.use(express.json());

// CRUD route
app.post('/api/v1/tea', (req, res) => {
  Tea
    .insert(req.body)
    .then(tea => res.send(tea));
});

app.get('/api/v1/tea/:id', (req, res) => {
  Tea
    .findById(req.params.id)
    .then(tea => res.send(tea));
});

app.put('/api/v1/tea/:id', (req, res) => {
  Tea 
    .update(req.params.id, req.body)
    .then(tea => res.send(tea));
});

app.delete('/api/v1/tea/:id'), (req, res) => {
  Tea
    .delete(req.params.id)
    .then(tea => res.send(tea));
};


module.exports = app;
