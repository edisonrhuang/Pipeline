const express = require('express');
const {     selectAllEmployers, selectEmployerByID, createEmployer, updateEmployer, deleteCandidate, } = require('../db/queries/employerQueries');

const router = express.Router();

router.get('/employer-data', (req, res) => {
    selectAllEmployers((err, employers) => {
        if (err) { return res.status(500).json({ error: 'Internal Server Error' }); }
        res.json(employers);
    });
});

router.post('api/create-employers', (req, res) => {
    const employerData = JSON.parse(req.body.data);
    createEmployer(employerData, (err, results) => {
        if (err) { return res.status(500).json({ error: 'Internal Server Error' }); }
        res.status(201).json({ message: 'Employer inserted successfully', employerId: results.insertId });
        console.log("Employer inserted successfully");
    })
});

router.post('/api/update-employers', (req, res) => {
    const employerData = JSON.parse(req.body.data);
    const employerId = employerData.employer_id;
    updateEmployer(employerData, employerId, (err, results) => {
        if (err) { return res.status(500).json({ error: 'Internal Server Error' }); }
        res.status(201).json({ message: 'Employer updated successfully', employerId: results.employerId });
        console.log("Employer updated successfully");
    });
})

router.post('/api/delete-employers', (req, res) => {
    const employerId = req.body.data;
    deleteEmployer(employerId, (err, results) => {
        if (err) { return res.status(500).json({ error: 'Internal Server Error' }); }
        res.status(201).json({ message: 'Employer deleted successfully', employerId: results.employerId });
        console.log("Employer deleted successfully");
    });
});

router.get('/api/get-employers', (req, res) => {
    selectAllEmployers((err, employers) => {
        if (err) { return res.status(500).json({ error: 'Internal Server Error' }); }
        res.send(employers);
    });
});

router.get('/api/get-employer/:id', (req, res) => {
    const employerId = req.body.data;
    selectEmployerByID(employerId, (err, employer) => {
        if (err) { return res.status(500).json({ error: 'Internal Server Error' }); }
        res.send(employer);
    });
});

module.exports = router;