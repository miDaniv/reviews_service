// server.js (або ваш файл серверу)
const express = require('express');
const con = require('./connection');
const app = express();

app.get('/api/movies/search', (req, res) => {
  const searchTerm = req.query.term;

  const query = `
    SELECT * FROM testdb.filmdata
    WHERE Title LIKE '%${searchTerm}%'
  `;

  con.query(query, (error, results) => {
    if (error) {
      console.error('Error searching movies:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/movies/recommendations', (req, res) => {
    const searchTerm = req.query.term;
  
    const query = `
      SELECT * FROM testdb.filmdata
      WHERE Title LIKE '%${searchTerm}%'
      LIMIT 10;  -- Обмежте кількість рекомендацій за вашим вибором
    `;
  
    con.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching recommendations:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
    });
});
module.exports = app;