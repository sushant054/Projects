module.exports = function(app, db) {
    // API endpoint to fetch bookings for a specific user by user_id
    app.get('/api/bookings', (req, res) => {
        const userId = req.query.user_id;
        const query = 'SELECT booking_id, hotel_name, check_in_date, check_out_date, number_of_guests, room_type, payment, status FROM hotelBooking WHERE user_id = ?';
        
        console.log('Executing query:', query, [userId]); // Debugging line

        db.query(query, [userId], (err, results) => {
            if (err) {
                console.error('Error fetching bookings:', err);
                res.status(500).send('Server error');
            } else {
                console.log('Query results:', results); // Debugging line
                res.json(results);
            }
        });
    });

    // API endpoint to delete a specific booking
    app.delete('/api/bookings/:id', (req, res) => {
        const bookingId = req.params.id;
        const query = 'DELETE FROM hotelBooking WHERE booking_id = ?';

        console.log('Executing delete query:', query, [bookingId]); // Debugging line
        
        db.query(query, [bookingId], (err, result) => {
            if (err) {
                console.error('Error deleting booking:', err);
                res.status(500).send('Server error');
            } else if (result.affectedRows === 0) {
                res.status(404).send('Booking not found');
            } else {
                res.sendStatus(200);
            }
        });
    });
};
