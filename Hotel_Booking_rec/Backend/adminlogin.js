require('dotenv').config(); // Import and configure dotenv
const jwt = require('jsonwebtoken');

module.exports = function(app, db) {
    // Admin credentials (hardcoded)
    const adminCredentials = {
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD
    };

    // Middleware to authenticate the JWT token
    function authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.sendStatus(401); // Unauthorized
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }
            req.user = user;
            next();
        });
    }

    // Admin login route
    app.post('/v1/admin-login', (req, res) => {
        const { username, password } = req.body;

        // Check if the provided credentials match the hardcoded ones
        if (username === adminCredentials.username && password === adminCredentials.password) {
            // Generate a JWT token for the admin
            const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });

            return res.status(200).json({
                message: 'Login successful',
                token
            });
        } else {
            return res.status(401).json({
                message: 'Invalid username or password'
            });
        }
    });

    // API to view users' information
    app.get('/v1/users', authenticateToken, (req, res) => {
        const query = 'SELECT * FROM users';

        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching users:', err);
                return res.status(500).send('Server error');
            }
            res.status(200).json(results);
        });
    });

    // API to view hotel details information
    app.get('/v1/hotel-details', authenticateToken, (req, res) => {
        const query = 'SELECT * FROM hotelBooking';

        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching hotel details:', err);
                return res.status(500).send('Server error');
            }
            res.status(200).json(results);
        });
    });
};
