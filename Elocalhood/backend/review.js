const express = require("express");
const bodyParser = require('body-parser');
const db = require('./database'); // Import MySQL database connection
const Joi = require('joi');
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.options('*', cors());

// Define joi schema for Review
const reviewSchema = Joi.object({
  id: Joi.string().min(3).max(50).required(),
  rating: Joi.number().integer().min(0).max(5).required(),
  comment: Joi.string().min(5).max(255).required()
});

// End point for review
app.post('/v1/review', async (req, res) => {
  // Validate request body using Joi schema
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { id, rating, comment } = req.body;

  try {
    // Check if the review with the same id already exists in the database
    const existingReview = await checkExistingReview(id);
    if (existingReview) {
      return res.status(409).send("Review with the same id already exists");
    }

    // Insert the review into the database
    const query = 'INSERT INTO review (id, rating, comment) VALUES (?, ?, ?)';
    const values = [id, rating, comment];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send("Internal Server Error");
      }
      console.log('Review successfully added');
      res.send("Review successfully added");
    });
  } catch (err) {
    console.error('Error checking existing review:', err);
    res.status(500).send("Internal Server Error");
  }
});

// Function to check if a review with the same id already exists in the database
async function checkExistingReview(id) {
  const query = 'SELECT * FROM review WHERE id = ?';
  const values = [id];

  return new Promise((resolve, reject) => {
    db.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.length > 0);
      }
    });
  });
}

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (err) {
    console.error('Error starting server:', err);
    return;
  }
  console.log(`Server is running on http://localhost:${port}`);
});
