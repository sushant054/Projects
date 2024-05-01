// signup.js

const express = require('express');
const mysql = require('./database');
const bodyParser = require('body-parser');
const Joi = require('joi');
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
 
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

const userSchema = Joi.object({
    Name: Joi.string().pattern(/^[a-zA-Z]+$/).min(3).max(30).required(),
    PhoneNumber: Joi.number().integer().min(1000000000).max(9999999999).custom((value, helpers) => {
        if (String(value).startsWith('123')) {
            return helpers.error('phoneNumber.invalid');
        }
        return value;
    }).required(),    
    Password: Joi.string().min(4).pattern(/^(?=.*[!@#$%^&*])(?=.*[a-zA-Z0-9]).{4,}$/).required(),
    Email: Joi.string().lowercase().email().required(),
    // Image: Joi.string().dataUri().required() // New field for image
});

app.post('/v1/signup', (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { Name, PhoneNumber, Password, Email, Image } = req.body;

    mysql.query('SELECT * FROM users WHERE email = ?', [Email], (err, results) => {
        if (err) {
            console.error('MySQL error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length > 0) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        mysql.query(
            'INSERT INTO users (name, phone_number, password, email, image) VALUES (?, ?, ?, ?, ?)',
            [Name, PhoneNumber, Password, Email, Image],
            (err, results) => {
                if (err) {
                    console.error('MySQL error:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                const userId = results.insertId;
                res.status(201).json({ user_id: userId, email: Email });
            }
        );
    });
});

 
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });





  