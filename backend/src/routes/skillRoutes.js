import express from 'express' 
import { selectAllSkills } from '../db/queries/skillQueries.js'

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
        res.send(skills);
    })
})

export default router;