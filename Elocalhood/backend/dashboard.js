const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database'); // MySQL database connection
const app = express();
const port = process.env.PORT || 3000;
                             
app.use(bodyParser.json());

// Endpoint to get service providers' information
app.get('/v1/serviceproviders', (req, res) => {
    const query = 'SELECT * FROM service_providers';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching service providers:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results);
    });
});

// Endpoint to get services list
app.get('/v1/service_name', (req, res) => {
    const query = 'SELECT * FROM service_name';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching service_name:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results);
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


