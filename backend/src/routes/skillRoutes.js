const express = require('express');
const { selectAllSkills } = require('../db/queries/skillQueries');

const router = express.Router();

// Route to fetch all skills
router.get('/api/get-skills', (req, res) => {
    // Call the selectAllSkills function to retrieve all skills from the database
    selectAllSkills((err, skills) => {
        if (err) {
            // If an error occurs during database query, return 500 Internal Server Error
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        // If successful, send the fetched skills as JSON response
        return res.send(skills);
    })
})


module.exports = router;