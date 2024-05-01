const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database'); // Assuming you have a database connection file
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Endpoint to fetch common service provider names
app.get('/v1/commonspnames', (req, res) => {
    const query = `
        SELECT service_name, COUNT(*) AS count 
        FROM service_providers 
        GROUP BY service_name 
        HAVING count > 1`; // here greater than 1 indicates repeated names

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching common service providers:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const commonServiceProviders = results.map(result => result.service_name);
        res.status(200).json({ commonServiceProviders });
    });
});

// Endpoint to fetch service providers by name
app.get('/v1/serviceproviders/:name', (req, res) => {
    const { name } = req.params;
    const query = 'SELECT * FROM service_providers WHERE service_name = ?';
    db.query(query, [name], (err, results) => 
    {
        if (err) {
            console.error('Error fetching service providers:', err);
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
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


