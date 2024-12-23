const express = require('express');
const db = require('../dbconfig');
const bcrypt = require('bcrypt');
const router = express.Router();

// Render the login page
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page' });
});

// Handle login submission
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if email exists in the database
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
        if (err) {
            console.error('Error retrieving user:', err.message);
            return res.status(500).send('Internal Server Error');
        }

        if (!user) {
            // If user is not found
            return res.status(400).send('Invalid email or password.');
        }

        try {
            // Compare the hashed password with the provided password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).send('Invalid email or password.');
            }

            // Login successful
            res.send(`Welcome, ${user.name}!`);
        } catch (err) {
            console.error('Error during password comparison:', err.message);
            res.status(500).send('Internal Server Error');
        }
    });
});

module.exports = router;