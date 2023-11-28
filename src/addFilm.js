// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const con = require('./connection');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.post('/add-film', upload.single('poster'), (req, res) => {
  const {
    title,
    originalTitle,
    releaseYear,
    ageRating,
    duration,
    genres,
    description,
    genreRating,
  } = req.body;

  const posterPath = req.file ? `/uploads/${req.file.filename}` : null;

  const sql = `INSERT INTO filmdata (Title, OriginalTitle, ReleaseYear, AgeRating, Duration, Genres, Description, Poster) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [title, originalTitle, releaseYear, ageRating, duration, JSON.stringify(genres), description, posterPath, genreRating];

  con.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error creating movie:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      res.status(201).json({ message: 'Movie created successfully' });
    }
  });
});

module.exports = app;
