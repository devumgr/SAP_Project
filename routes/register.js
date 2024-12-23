const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../dbconfig');
const router = express.Router();

const salt = bcrypt.genSaltSync(10);

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordRegex.test(password);
}

// Render the registration form
router.get('/', (req, res) => {
    res.render('register', { title: 'Register Page' });
});

//
router.post('/register', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!isValidEmail(email)) {
        return res.status(400).send('Email is invalid');
    }
    if (!isValidPassword(password)) {
        return res.status(400).send('Password must be least 6 characters long and include an uppercase letter, a lowercase letter, and a number. ');
    }
    if (password !== password) {
        return res.status(400).send('Password is Dont match');
    }
    try {
        const hashedPassword = await bcrypt.hash(password, salt);
        const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        db.run(sql, [name, email, hashedPassword], function (err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint')) {
                    return res.status(400).send('Email is already registered.');
                }
                console.error('Database error:', err.message);
                return res.status(500).send('Internal server error.');
            }
            // Redirect to the success page or user dashboard
            res.redirect(`/users/${this.lastID}`);
        });

    } catch (e) {

    }
})

module.exports = router;
