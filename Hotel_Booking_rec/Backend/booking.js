const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-secret-key'; // Ensure this matches the key used for token generation

// Middleware to authenticate the JWT token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log('Retrieved token:', token); // Debug log

    if (!token) {
        console.log('No token provided');
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.log('Token verification failed:', err.message);
            return res.sendStatus(403); // Forbidden
        }
        req.user = user;
        next();
    });
}

module.exports = function(app, mysql) {
    // Get user ID (requires authentication)
    app.get('/api/user-id', authenticateToken, (req, res) => {
        if (req.user && req.user.user_id) {
            return res.status(200).json({ user_id: req.user.user_id });
        } else {
            return res.status(401).json({ error: 'Unauthorized - User not logged in' });
        }
    });

    // Add a new booking using hotel name
    app.post('/api/bookings', authenticateToken, (req, res) => {
        const { hotel_name, check_in, check_out, guest, room_type, payment, status } = req.body;
        const user_id = req.user.user_id; // Use authenticated user's ID

        if (!hotel_name || !check_in || !check_out || !guest || !room_type) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const sql = `
            INSERT INTO hotelBooking (user_id, hotel_name, check_in_date, check_out_date, number_of_guests, room_type, payment, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        mysql.query(sql, [user_id, hotel_name, check_in, check_out, guest, room_type, payment || null, status || 'draft'], (err) => {
            if (err) {
                console.error('Error adding booking:', err);
                return res.status(500).json({ error: 'Failed to add booking' });
            }
            res.status(201).json({ message: 'Booking added successfully' });
        });
    });

    // Update the status of a booking
    app.post('/api/update-status', authenticateToken, (req, res) => {
        const { booking_id, status } = req.body;

        if (!booking_id || !status) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const sql = `
            UPDATE hotelBooking
            SET status = ?
            WHERE booking_id = ?
        `;
        mysql.query(sql, [status, booking_id], (err) => {
            if (err) {
                console.error('Error updating booking status:', err);
                return res.status(500).json({ error: 'Failed to update booking status' });
            }
            res.status(200).json({ message: 'Booking status updated successfully' });
        });
    });
};
