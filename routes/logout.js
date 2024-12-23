const express = require('express');
const router = express.Router();

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Internal Server Error');
        }

        // Clear the cookie
        res.clearCookie('connect.sid', { path: '/' });
        res.redirect('/login'); // Redirect to the login page
    });
});

module.exports = router;
