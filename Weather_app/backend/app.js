const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const locationRoutes = require('./location');

dotenv.config();
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Location API Route
app.use('/api', locationRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
