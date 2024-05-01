// Importing required modules
const express = require('express');
const db = require('./database'); // MySQL database connection

// Creating an Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Define endpoint to fetch service provider information
app.get('/v1/viewsppage', (req, res) => {
    const query = 'SELECT * FROM service_providers';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data from MySQL:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results);
    });
});

// Error handling middleware for JSON parsing errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: 'Invalid JSON' });
    }
    next();
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
