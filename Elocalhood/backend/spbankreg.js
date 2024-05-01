const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('joi'); // Import Joi for validation
const db = require('./database'); // Import MySQL database connection
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Define Joi schema for request body validation
const schema = Joi.object({
    BankAccDetails: Joi.object({
        Name: Joi.string().pattern(/[a-zA-Z]/).required(),
        AccNumber: Joi.string().pattern(/^\d{9,18}$/).required(),
        "Re-enterAccNumber": Joi.string().valid(Joi.ref('AccNumber')).required(),
        IFSCCode: Joi.string().pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/).required()
    })
});

// Endpoint for Service Provider Registration with Bank Account Details
app.post('/v1/spbankreg', async (req, res) => {
    // Validate request body against Joi schema
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { BankAccDetails } = req.body;

    // Check if the account number already exists in the database
    try {
        const existingRecord = await checkExistingRecord(BankAccDetails.AccNumber);
        if (existingRecord) {
            return res.status(409).json({ error: 'Account Number already exists' });
        }

        // Perform registration logic here (e.g., save to database)
        const query = 'INSERT INTO service_providers_bank (acc_holder_name, bank_acc_number, ifsc_code) VALUES (?, ?, ?)';
        const values = [BankAccDetails.Name, BankAccDetails.AccNumber, BankAccDetails.IFSCCode];

        db.query(query, values, (err, result) => {
            if (err) {
                console.error('Error inserting data into MySQL:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            
            const provider_id = result.insertId; // Get the inserted provider ID
            res.status(200).json({ provider_id, store_name: 'string' }); // Assuming store name is not provided in this endpoint
        });
    } catch (err) {
        console.error('Error checking existing record:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Function to check if the account number already exists in the database
async function checkExistingRecord(accNumber) {
    const query = 'SELECT * FROM service_providers_bank WHERE bank_acc_number = ?';
    const values = [accNumber];

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

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
