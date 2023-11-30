const express = require('express');
const cors = require('cors');
const con = require('./connection');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/user/:id', (req, res) => {
  const userId = parseInt(req.params.id);
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