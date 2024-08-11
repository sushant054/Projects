module.exports = function(app, db) {
    // API endpoint to fetch all bookings
    app.get('/api/bookings', (req, res) => {
        const query = 'SELECT * FROM Bookings';
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching bookings:', err);
                res.status(500).send('Server error');
            } else {
                res.json(results);
            }
        });
    });
 
    // API endpoint to delete a specific booking
    app.delete('/api/bookings/:id', (req, res) => {
        const bookingId = req.params.id;
        const query = 'DELETE FROM Bookings WHERE booking_id = ?';
 
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
 