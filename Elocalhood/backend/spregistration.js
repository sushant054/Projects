const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database'); // MySQL database connection
const Joi = require('joi'); // Data validation
const cors = require("cors"); // Cross-origin resource sharing

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();  
};
app.use(allowCrossDomain);

const serviceProviderSchema = Joi.object({
    YourStoreName: Joi.string().min(3).max(50).required(),
    Pincode: Joi.string().pattern(/^\d{6}$/).required(),
    City: Joi.string().min(3).max(50).required(),
    State: Joi.string().min(2).max(50).required(),
    Address: Joi.string().min(5).max(255).required(),
    ServiceName: Joi.string().min(2).max(40).required()
});

// Endpoint for Service Provider Registration
app.post('/v1/spregistration', async (req, res) => {
    const { error } = serviceProviderSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { YourStoreName, Pincode, City, State, Address, ServiceName } = req.body;

    // Check if the store already exists
    const existingStore = await checkExistingStore(YourStoreName, City, State, Address, ServiceName);
    if (existingStore) {
        return res.status(409).json({ error: 'Store already exists' });
    }

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

async function checkExistingStore(YourStoreName, City, State, Address, ServiceName) {
    const query = 'SELECT * FROM service_providers WHERE store_name = ? AND city = ? AND state = ? AND address = ? AND service_name = ?';
    const values = [YourStoreName, City, State, Address, ServiceName];

    return new Promise((resolve, reject) => {
        db.query(query, values, (err, result) => {
            if (err) {
                console.error('Error checking existing store:', err);
                reject(err);
            } else {
                resolve(result.length > 0);
            }
        });
    });
}

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
