const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors()); // Allows requests from any origin
app.use(bodyParser.json());

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'frontend' directory
app.use(express.static('frontend'));

// Handle form submission
app.post('/submit-booking', (req, res) => {
    const { user_name, hotel_id, check_in_date, check_out_date, number_of_guests, room_type, total_amount, special_requests } = req.body;

    // Here, you can save the booking data to a database or perform other operations
    console.log('Booking Details:', req.body);

    // For now, we'll just send a response back to the user
    res.send(`Booking successful for ${user_name} at hotel ${hotel_id}.`);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
