 // Importing required modules
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database'); // MySQL database connection
const Joi = require('joi'); // Data validation
const cors = require("cors"); // Cross-origin resource sharing
const PDFDocument = require('pdfkit'); // PDF generation

// Create an Express app
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Middleware for allowing cross-domain requests
app.options('*', cors());

// Custom middleware for allowing cross-domain requests (alternative approach)
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();  
};
app.use(allowCrossDomain);

// Define Joi schema for Service Provider Registration data validation
const serviceProviderSchema = Joi.object({
    YourStoreName: Joi.string().min(3).max(50).required(),
    Pincode: Joi.string().pattern(/^\d{6}$/).required(),
    City: Joi.string().min(3).max(50).required(),
    State: Joi.string().min(2).max(50).required(),
    Address: Joi.string().min(5).max(255).required(),
    ServiceName: Joi.string().min(2).max(40).required()
});

// Endpoint for Service Provider Registration
app.post('/v1/spregistration', (req, res) => {
    const { error } = serviceProviderSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { YourStoreName, Pincode, City, State, Address, ServiceName } = req.body;

    // Perform registration logic here (e.g., save to database)
    const query = 'INSERT INTO service_providers (store_name, pincode, city, state, address, service_name) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [YourStoreName, Pincode, City, State, Address, ServiceName];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const provider_id = result.insertId; // Get the inserted provider ID
        res.status(200).json({ provider_id, store_name: YourStoreName });
    });
});

// Endpoint for generating PDF report
app.get('/v1/spreport', (req, res) => {
    const doc = new PDFDocument();
    doc.pipe(res);

    // Query database to get all information
    const query = 'SELECT * FROM service_providers';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data from MySQL:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            // Write information to PDF
            doc.fontSize(14).text('Service Providers Report', { align: 'center' }).moveDown();
            results.forEach(provider => {
                doc.fontSize(12).text(`Store Name: ${provider.store_name}`);
                doc.text(`Pincode: ${provider.pincode}`);
                doc.text(`City: ${provider.city}`);
                doc.text(`State: ${provider.state}`);
                doc.text(`Address: ${provider.address}`);
                doc.text(`Service Name: ${provider.service_name}`).moveDown();
            });
            doc.end();
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

