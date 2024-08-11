const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken'); // Import JWT
const fs = require('fs');

// Create the Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Secret key for JWT
const JWT_SECRET = 'your-secret-key'; // Replace with a secure secret key

// Middleware for sessions
app.use(session({
    secret: 'your-session-secret',  // Replace with a strong secret
    resave: false,
    saveUninitialized: true
}));

// Serve static files
app.use(express.static(path.join(__dirname, 'frontend')));

// Database module
const db = require('./database'); // Ensure database.js exists in the same directory

// Include the route files
require('./login')(app, db);  // Adjust the path if needed
require('./signup')(app, db); // Adjust the path if needed
require('./readdata')(app);   // Adjust the path if needed
require('./booking')(app, db); // Your bookings API
require('./show-booking')(app, db); // Show and delete booking data

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
