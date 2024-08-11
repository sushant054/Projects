const bcrypt = require('bcrypt'); // Import bcrypt
const Joi = require('joi');

module.exports = function(app, mysql) {
    const userSchema = Joi.object({
        Name: Joi.string().pattern(/^[a-zA-Z]+$/).min(3).max(30).required(),
        UserName: Joi.string().alphanum().min(3).max(30).required(),
        Password: Joi.string().min(4).pattern(/^(?=.*[!@#$%^&*])(?=.*[a-zA-Z0-9]).{4,}$/).required(),
        PhoneNumber: Joi.string().pattern(/^[0-9]{10}$/).custom((value, helpers) => {
            if (value.startsWith('123')) {
                return helpers.error('phoneNumber.invalid');
            }
            return value;
        }).required(),
        Email: Joi.string().lowercase().email().required(),
    });

    app.post('/v1/signup', (req, res) => {
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        
        const { Name, UserName, Password, PhoneNumber, Email } = req.body;

        mysql.query('SELECT * FROM users WHERE email = ?', [Email], (err, results) => {
            if (err) {
                console.error('MySQL error:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (results.length > 0) {
                return res.status(409).json({ error: 'Email already exists' });
            }

            // Hash the password before storing
            bcrypt.hash(Password, 10, (err, hashedPassword) => {
                if (err) {
                    console.error('Error hashing password:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                mysql.query(
                    'INSERT INTO users (name, username, password, phone_number, email) VALUES (?, ?, ?, ?, ?)',
                    [Name, UserName, hashedPassword, PhoneNumber, Email],
                    (err, results) => {
                        if (err) {
                            console.error('MySQL error:', err);
                            return res.status(500).json({ error: 'Internal Server Error' });
                        }

                        const userId = results.insertId;
                        res.status(201).json({ user_id: userId, username: UserName });
                    }
                );
            });
        });
    });
};
