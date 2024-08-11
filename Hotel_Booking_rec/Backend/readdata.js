const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

module.exports = function(app) {
    app.get('/v1/hotel-bookings', (req, res) => {
        let results = [];
        const searchTerm = req.query.search || ''; // Get search query from URL

        fs.createReadStream(path.join(__dirname, './Dataset/csv_data.csv'))
          .pipe(csv())
          .on('data', (data) => {
              console.log('Data from CSV:', data); // Log each data object to verify its structure
              
              // Check if the data object contains 'Hid' and other fields
              if (searchTerm === '' || Object.values(data).some(val => val.toString().toLowerCase().includes(searchTerm.toLowerCase()))) {
                  results.push(data);
              }
          })
          .on('end', () => {
              console.log('Results:', results); // Log results to verify correctness
              res.json(results);
          })
          .on('error', (err) => {
              console.error('Error reading CSV file:', err);
              res.status(500).send('Internal Server Error');
          });
    });
};
