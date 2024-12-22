const express = require('express');
const db = require('../dbconfig'); // SQLite setup

const router = express.Router();

// Render the registration form
router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

// Handle form submissions
router.post('/register', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match.');
    }

    try {
        const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        db.run(sql, [name, email, password], (err) => {
            if (err) {
                if (err.message.includes('UNIQUE constraint')) {
                    return res.status(400).send('Email is already registered.');
                }
                return res.status(500).send('Error saving user.');
            }
            res.redirect('/register/success');
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal server error.');
    }
});

// Success page
router.get('/register/success', (req, res) => {
    res.render('success', { title: 'Registration Successful' });
});

module.exports = router;
