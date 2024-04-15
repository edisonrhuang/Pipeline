const express = require('express');
const { selectAllCandidates, selectCandidateByID, createCandidate, updateCandidate, deleteCandidate } = require('../db/queries/candidateQueries');
const { createSkills } = require('../db/queries/skillQueries');

const router = express.Router();

router.get('/candidate-data', (req, res) => {
    selectAllCandidates((err, candidates) => {
        if (err) { return res.status(500).json({ error: 'Internal Server Error' }); }
        res.json(candidates);
    });
});

router.post('/api/create-candidates', (req, res) => {
    const candidateData = JSON.parse(req.body.data);
    const candidateSkills = JSON.parse(req.body.skills);
    createCandidate(candidateData, (err, results) => {
        if (err) { return res.status(500).json({ error: 'Internal Server Error' }); }

        if (Object.keys(candidateSkills).length !== 0) {
            createSkills(results.insertId, candidateSkills, (err, results) => {
                if (err) { return res.status(500).json({ error: 'Internal Server Error' }); }
                res.status(201).json({ message: 'Candidate and skills inserted successfully', candidateId: results.insertId });
                console.log("Candidate and skills inserted successfully");
            })
        } else {
            res.status(201).json({ message: 'Candidate inserted successfully', candidateId: results.insertId });
            console.log("Candidate inserted successfully");
        }
    });
});

router.post('/api/update-candidates', (req, res) => {
    const candidateData = JSON.parse(req.body.data);
    const candidateId = candidateData.candidate_id;
    updateCandidate(candidateData, candidateId, (err, results) => {
        if (err) { return res.status(500).json({ error: 'Internal Server Error' }); }
        res.status(201).json({ message: 'Candidate updated successfully', candidateId: results.candidateId });
        console.log("Candidate updated successfully");
    });
});

router.post('/api/delete-candidates', (req, res) => {
    const candidateId = req.body.data;
    deleteCandidate(candidateId, (err, results) => {
        if (err) { return res.status(500).json({ error: 'Internal Server Error' }); }
        res.status(201).json({ message: 'Candidate deleted successfully', candidateId: results.candidateId });
        console.log("Candidate deleted successfully");
    });
});

router.get('/api/get-candidates', (req, res) => {
    selectAllCandidates((err, candidates) => {
        if (err) { return res.status(500).json({ error: 'Internal Server Error' }); }
        res.send(candidates);
    });
});

router.get('/api/get-candidate/:id', (req, res) => {
    const candidateId = req.body.data;
    selectCandidateByID(candidateId, (err, candidate) => {
        if (err) { return res.status(500).json({ error: 'Internal Server Error' }); }
        res.send(candidate);
    });
});

module.exports = router;
