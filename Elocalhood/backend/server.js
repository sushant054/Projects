const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_mysql_username',
    password: 'your_mysql_password',
    database: 'your_database_name'
});

db.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Signup endpoint
app.post('/signup', (req, res) => {
    const { name, email, password, phoneNumber } = req.body;
    const sql = 'INSERT INTO users (name, email, password, phone_number) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, password, phoneNumber], (err, result) => {
        if (err) {
            console.log('Error signing up:', err);
            res.status(500).send('Error signing up');
            return;
        }
        console.log('User signed up successfully');
        res.status(200).send('User signed up successfully');
    });
});

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.log('Error logging in:', err);
            res.status(500).send('Error logging in');
            return;
        }
        if (result.length === 0) {
            console.log('Invalid credentials');
            res.status(401).send('Invalid credentials');
            return;
        }
        console.log('User logged in successfully');
        res.status(200).send('User logged in successfully');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});