import express from 'express'

const { selectAllCandidates, selectCandidateByID, createCandidate, updateCandidate, deleteCandidate } = require('../db/queries/candidateQueries');
const { createSkills } = require('../db/queries/skillQueries');

const router = express.Router();

// Route to fetch all candidates' data
router.get('/candidate-data', (req, res) => {
    selectAllCandidates((err, candidates) => {
        if (err) {
            // If an error occurs during database query, return 500 Internal Server Error
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        // If successful, send the fetched candidates as JSON response
        res.json(candidates);
    });
});

// Route to create a new candidate along with their skills
router.post('/api/create-candidates', (req, res) => {
    // Parse request body to extract candidate data and skills
    const candidateData = JSON.parse(req.body.data);
    const candidateSkills = JSON.parse(req.body.skills);
    createCandidate(candidateData, (err, results) => {
        if (err) {
            // If an error occurs during candidate creation, return 500 Internal Server Error
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (Object.keys(candidateSkills).length !== 0) {
            // If candidate has skills, insert them into the database
            createSkills(results.insertId, candidateSkills, (err, results) => {
                if (err) {
                    // If an error occurs during skill creation, return 500 Internal Server Error
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                // If successful, return 201 Created along with a success message and candidate ID
                res.status(201).json({ message: 'Candidate and skills inserted successfully', candidateId: results.insertId });
                console.log("Candidate and skills inserted successfully");
            })
        } else {
            // If candidate has no skills, return 201 Created along with a success message and candidate ID
            res.status(201).json({ message: 'Candidate inserted successfully', candidateId: results.insertId });
            console.log("Candidate inserted successfully");
        }
    });
});

// Route to update an existing candidate
router.put('/api/update-candidates', (req, res) => {
    // Parse request body to extract candidate data and candidate ID
    const candidateData = JSON.parse(req.body.data);
    const candidateId = candidateData.candidate_id;
    updateCandidate(candidateData, candidateId, (err, results) => {
        if (err) {
            // If an error occurs during candidate update, return 500 Internal Server Error
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        // If successful, return 200 Created along with a success message and candidate ID
        res.status(200).json({ message: 'Candidate updated successfully', candidateId: results.candidateId });
        console.log("Candidate updated successfully");
    });
});

// Route to delete a candidate
router.delete('/api/delete-candidates', (req, res) => {
    // Extract candidate ID from request body
    const candidateId = req.body.data;
    deleteCandidate(candidateId, (err, results) => {
        if (err) {
            // If an error occurs during candidate deletion, return 500 Internal Server Error
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        // If successful, return 200 Created along with a success message and candidate ID
        res.status(200).json({ message: 'Candidate deleted successfully', candidateId: results.candidateId });
        console.log("Candidate deleted successfully");
    });
});

// Route to fetch all candidates
router.get('/api/get-candidates', (req, res) => {
    selectAllCandidates((err, candidates) => {
        if (err) {
            // If an error occurs during database query, return 500 Internal Server Error
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        // If successful, send the fetched candidates as JSON response
        res.send(candidates);
    });
});

// Route to fetch a specific candidate by ID
router.get('/api/get-candidate/:id', (req, res) => {
    // Extract candidate ID from request parameters
    const candidateId = req.params.id;
    selectCandidateByID(candidateId, (err, candidate) => {
        if (err) {
            // If an error occurs during database query, return 500 Internal Server Error
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        // If successful, send the fetched candidate as JSON response
        res.send(candidate);
    });
});


export default router