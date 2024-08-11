module.exports = (app, mysql) => {
    // Fetch all bookings
    app.get('/api/bookings', (req, res) => {
        const sql = 'SELECT * FROM Bookings';
        mysql.query(sql, (err, results) => {
            if (err) {
                console.error('Error fetching bookings:', err);
                return res.status(500).json({ error: 'Failed to fetch bookings' });
            }
            res.json(results);
        });
    });

    // Add a new booking
    app.post('/api/bookings', (req, res) => {
        const { hotel_name, check_in, check_out, guest, room_type, payment, status } = req.body;

        // Ensure all required fields are provided
        if (!hotel_name || !check_in || !check_out || !guest || !room_type) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const sql = `
            INSERT INTO Bookings (hotel_name, check_in, check_out, guest, room_type, payment, status)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        mysql.query(sql, [hotel_name, check_in, check_out, guest, room_type, payment || null, status || 'draft'], (err) => {
            if (err) {
                console.error('Error adding booking:', err);
                return res.status(500).json({ error: 'Failed to add booking' });
            }
            res.status(201).json({ message: 'Booking added successfully' });
        });
    });

    // Update the status of a booking (This endpoint assumes status changes are made upon creation or specific requests)
    app.post('/api/update-status', (req, res) => {
        const { hotel_name, check_in, check_out, guest, room_type, payment, status } = req.body;

        // Ensure all required fields are provided
        if (!hotel_name || !check_in || !check_out || !guest || !room_type || !status) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const sql = `
            INSERT INTO Bookings (hotel_name, check_in, check_out, guest, room_type, payment, status)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        mysql.query(sql, [hotel_name, check_in, check_out, guest, room_type, payment || null, status], (err) => {
            if (err) {
                console.error('Error adding booking:', err);
                return res.status(500).json({ error: 'Failed to add booking' });
            }
            res.status(201).json({ message: 'Booking added successfully with status' });
        });
    });
};
