const express = require('express');
const mysql = require('./database');
const bodyParser = require('body-parser');
const Joi = require('joi');
const cors = require("cors");
const PDFDocument = require('pdfkit');

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
    PhoneNumber: Joi.number().integer().min(1000000000).max(9999999999).required(),
    Password: Joi.string().min(4).required(), // No need for pattern validation, will be hashed
    Email: Joi.string().lowercase().email().required(),
    // Image: Joi.string().dataUri().required() // New field for image
});

app.post('/v1/signup', async (req, res) => {
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

// Endpoint for generating PDF report of signed up users
app.get('/v1/signup-report', (req, res) => {
    const doc = new PDFDocument();
    doc.pipe(res);

    // Query database to get all signed up user information
    const query = 'SELECT name, phone_number, email FROM users';
    mysql.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data from MySQL:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            // Write user information to PDF
            doc.fontSize(14).text('Signed Up Users Report', { align: 'center' }).moveDown();
            results.forEach(user => {
                doc.fontSize(12).text(`Name: ${user.name}`);
                doc.text(`Phone Number: ${user.phone_number}`);
                doc.text(`Email: ${user.email}`).moveDown();
            });
            doc.end();
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
