const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const con = require('./connection');
const app = express();

app.use(bodyParser.json());

app.get('/api/todo', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decodedToken = jwt.verify(token, 'your_secret_key');
    const userId = decodedToken.userId;

    res.status(200).json({ UserId: userId });
  } catch (error) {
    console.error('Error decoding token:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.get('/api/todos', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decodedToken = jwt.verify(token, 'your_secret_key');
    const userId = decodedToken.userId;

    const query = 'SELECT * FROM todolist WHERE UserId = ?';
    con.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching todos:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(results);
      }
    });
  } catch (error) {
    console.error('Error decoding token:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.post('/api/todo', (req, res) => {
  const { ThingToDo } = req.body;
  const Status = 0; // Default status is set to 0 (not done)
  
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decodedToken = jwt.verify(token, 'your_secret_key');
    const userId = decodedToken.userId;

    const query = 'INSERT INTO todolist (ThingToDo, Status, UserId) VALUES (?, ?, ?)';
    con.query(query, [ThingToDo, Status, userId], (err, result) => {
      if (err) {
        console.error('Error adding todo:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.sendStatus(201);
      }
    });
  } catch (error) {
    console.error('Error decoding token:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.put('/api/todo/:id', (req, res) => {
  const id = req.params.id;
  const { ThingToDo, Status } = req.body;

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decodedToken = jwt.verify(token, 'your_secret_key');
    const userId = decodedToken.userId;

    const query = 'UPDATE todolist SET ThingToDo = ?, Status = ? WHERE Id = ? AND UserId = ?';
    con.query(query, [ThingToDo, Status, id, userId], (err, result) => {
      if (err) {
        console.error('Error updating todo:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.sendStatus(200);
      }
    });
  } catch (error) {
    console.error('Error decoding token:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.delete('/api/todo/:id', (req, res) => {
  const id = req.params.id;

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decodedToken = jwt.verify(token, 'your_secret_key');
    const userId = decodedToken.userId;

    const query = 'DELETE FROM todolist WHERE Id = ? AND UserId = ?';
    con.query(query, [id, userId], (err, result) => {
      if (err) {
        console.error('Error deleting todo:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.sendStatus(200);
      }
    });
  } catch (error) {
    console.error('Error decoding token:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
});

module.exports = app;