const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Handle GET request for hotel bookings
app.get('/v1/hotel-bookings', (req, res) => {
    let results = [];
    const searchTerm = req.query.search || ''; // Get search query from URL

    fs.createReadStream('./Dataset/csv_data.csv')
      .pipe(csv())
      .on('data', (data) => {
          console.log('Data from CSV:', data); // Log each data object to verify its structure
          // Adjust filtering logic based on CSV headers
          if (searchTerm === '' || Object.values(data).some(val => val.toString().toLowerCase().includes(searchTerm.toLowerCase()))) {
              results.push(data);
          }
      })
      .on('end', () => {
          res.json(results);
      });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
