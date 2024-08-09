const express = require('express');
const mysql = require('./database'); // Import database connection
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/v1/login', (req, res) => {
    const { username, password } = req.body;

    // Check if the request body has both username and password
    if (!username || !password) {
        return res.status(400).json({ error: 'Bad Request - Incorrect Username/Password' });
    }

    // Find user by username in the database
    const query = 'SELECT * FROM users WHERE username = ?';
    mysql.query(query, [username], (err, results) => {
        if (err) {
            console.error('MySQL Error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Check if the user exists
        if (results.length === 0) {
            return res.status(404).json({ error: 'Not Found - Username does not exist' });
        }

        const user = results[0];

        // Check if the password is correct (in a real application, use a secure method for password comparison)
        if (user.password !== password) {
            return res.status(400).json({ error: 'Bad Request - Incorrect Password' });
        }

        // Successful login!!!
        return res.status(200).json({ user_id: user.user_id, username: user.username });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
