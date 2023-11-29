const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const con = require('./connection');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/api/users', (req, res) => {  
  console.log('inside users')
    const query = 'SELECT * FROM userdata';
  
    con.query(query, [], (err, results) => {
      if (err) {
        console.error('Error executing database query:', err);
        res.status(500).json({ message: 'Internal Server Error' });
      } else if (results.length > 0) {
        res.status(200).json(results);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    });
  });

app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);

  if (isNaN(userId)) {
    res.status(400).json({ message: 'Invalid user ID' });
    return;
  }

  const query = 'SELECT * FROM userdata WHERE id = ?';

  con.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error executing database query:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else if (results.length > 0) {
      const user = results[0];
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
});

module.exports = app;