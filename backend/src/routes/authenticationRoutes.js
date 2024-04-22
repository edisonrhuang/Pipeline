const express = require('express');
const { getUserInfo } = require('../db/queries/authenticationQueries');

const router = express.Router();

// Route to fetch user information
router.get('/user-info', (req, res) => {
    // Extract email from request body
    const email = req.body.email;
    // Call function to get user information based on the provided email
    getUserInfo(email, (err, results) => {
        // If an error occurs during fetching user information, return 500 Internal Server Error
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        // If successful, return user information
        return res.json(results);
    });
});

module.exports = router;