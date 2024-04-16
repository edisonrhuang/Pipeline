const express = require('express');
const { selectAllSkills } = require('../db/queries/skillQueries');

const router = express.Router();

router.get('/api/get-skills', (req, res) => {
    selectAllSkills((err, skills) => {
        if (err) { return res.status(500).json({ error: 'Internal Server Error' }); }
        res.send(skills);
    })
})

module.exports = router;