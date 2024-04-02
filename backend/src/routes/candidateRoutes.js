const express = require('express');
const { selectAllCandidates, createCandidate, updateCandidate, deleteCandidate } = require('../db/queries/candidateQueries');

const router = express.Router();

router.get('/data', (req, res) => {
    selectAllCandidates((err, candidates) => {
        if (err) { return res.status(500).json({ error: 'Internal Server Error' }); }
        res.json(candidates);
    });
});

router.post('/api/create-candidates', (req, res) => {
    const candidateData = JSON.parse(req.body.data);
    createCandidate(candidateData, (err, results) => {
        if (err) { return res.status(500).json({ error: 'Internal Server Error' }); }
        res.status(201).json({ message: 'Candidate inserted successfully', candidateId: results.candidateId });
        console.log("Candidate inserted successfully");
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

module.exports = router;
