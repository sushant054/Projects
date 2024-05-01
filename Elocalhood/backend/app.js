// Importing required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const login = require('./login.js');//done
const signup = require('./signup.js');//done
const spregistration = require('./spregistration.js');//done
const sqbankreg = require('./spbankreg.js');
//const ssdomain = require('./ssdomain.js');
const mysql =require('./database');
const Joi = require('joi');

// Creating an Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Run the functionalities of each file
login.run(app);
signup.run(app);
spregistration.run(app);
sqbankreg.run(app);
//ssdomain.run(app);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

