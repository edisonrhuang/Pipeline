const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { selectAllCandidates, createCandidate, updateCandidate, deleteCandidate } = require('./database/queries');

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("<h1>Backend Running<h1>");
});

app.get('/data', (req, res) => {
    selectAllCandidates((err, candidates) => {
        if (err) { return res.status(500).json({ error: 'Internal Server Error' }); }
        res.json(candidates);
    });
})

app.post('/api/create-candidates', (req, res) => {
    const candidateData = JSON.parse(req.body.data);
    createCandidate(candidateData, (err, results) => {
        if (err) { return res.status(500).json({ error: 'Internal Server Error' }); }
        res.status(201).json({ message: 'Candidate inserted successfully', candidateId: results.candidateId });
        console.log("Candidate inserted successfully");
    });
})

app.post('/api/update-candidates', (req, res) => {
    const candidateData = JSON.parse(req.body.data);
    const candidateId = candidateData.candidate_id;
    updateCandidate(candidateData, candidateId, (err, results) => {
        if (err) { return res.status(500).json({ error: 'Internal Server Error' }); }
        res.status(201).json({ message: 'Candidate updated successfully', candidateId: results.candidateId });
        console.log("Candidate updated successfully");
    })
})

app.post('/api/delete-candidates', (req, res) => {
    const candidateId = req.body.data;
    deleteCandidate(candidateId, (err, results) => {
        if (err) { return res.status(500).json({ error: 'Internal Server Error' }); }
        res.status(201).json({ message: 'Candidate deleted successfully', candidateId: results.candidateId });
        console.log("Candidate deleted successfully");
    })
})

app.get('/api/get-candidates', (req, res) => {
    selectAllCandidates((err, candidates) => {
        if (err) { return res.status(500).json({ error: 'Internal Server Error' }); }
        res.send(candidates);
    })
})

app.listen(5002, () => {
    console.log('Server is running on port 5002');
});