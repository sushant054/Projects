const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'psw',
    database: 'e_Localhood1',
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Unable to connect to MySQL:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL');
});
module.exports = db;