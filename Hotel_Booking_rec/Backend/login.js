module.exports = function(app, mysql) {
    
// Login endpoint
app.post('/v1/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Bad Request - Incorrect Username/Password' });
    }

    const query = 'SELECT * FROM users WHERE username = ?';
    mysql.query(query, [username], (err, results) => {
        if (err) {
            console.error('MySQL Error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Not Found - Username does not exist' });
        }

        const user = results[0];

        if (user.password !== password) {
            return res.status(400).json({ error: 'Bad Request - Incorrect Password' });
        }

        return res.status(200).json({ user_id: user.user_id, username: user.username });
    });
});

// Verify Username endpoint
app.post('/v1/verify-username', (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    mysql.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error('MySQL Error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Username not found' });
        }

        res.status(200).json({ message: 'Username verified' });
    });
});

// Update Password endpoint
app.post('/v1/update-password', (req, res) => {
    const { username, newPassword } = req.body;

    if (!username || !newPassword) {
        return res.status(400).json({ error: 'Username and new password are required' });
    }

    const hashedPassword = hashPassword(newPassword);

    mysql.query('UPDATE users SET password = ? WHERE username = ?', [hashedPassword, username], (err) => {
        if (err) {
            console.error('MySQL Error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(200).json({ message: 'Password updated successfully' });
    });
});

// Function to hash passwords (replace with your actual hashing method)
function hashPassword(password) {
    // Use a hashing library like bcrypt to hash the password
    return password; // Placeholder - Replace with actual hashing
}

};
