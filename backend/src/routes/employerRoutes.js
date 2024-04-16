const express = require('express');
const { selectAllEmployers, selectEmployerByID, updateEmployer, deleteEmployer, getEmployerConnections } = require('../db/queries/employerQueries');

const router = express.Router();

// Route to fetch all employers' data
router.get('/employer-data', (req, res) => {
    selectAllEmployers((err, employers) => {
        if (err) {
            // If an error occurs during database query, return 500 Internal Server Error
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        // If successful, send the fetched employers as JSON response
        return res.json(employers);
    });
});

// Route to create a new employer
router.post('/api/create-employers', (req, res) => {
    // Parse request body to extract employer data
    const employerData = JSON.parse(req.body.data);
    createEmployer(employerData, (err, results) => {
        if (err) {
            // If an error occurs during employer creation, return 500 Internal Server Error
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        // If successful, return 201 Created along with a success message and employer ID
        res.status(201).json({ message: 'Employer inserted successfully', employerId: results.insertId });
        return console.log("Employer inserted successfully");
    })
});

// Route to update an existing employer
router.post('/api/update-employers', (req, res) => {
    // Parse request body to extract employer data and employer ID
    const employerData = JSON.parse(req.body.data);
    const employerId = employerData.employer_id;
    updateEmployer(employerData, employerId, (err, results) => {
        if (err) {
            // If an error occurs during employer update, return 500 Internal Server Error
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        // If successful, return 200 Created along with a success message and employer ID
        res.status(200).json({ message: 'Employer updated successfully', employerId: results.employerId });
        return console.log("Employer updated successfully");
    });
})

// Route to delete an employer
router.post('/api/delete-employers', (req, res) => {
    // Extract employer ID from request body
    const employerId = req.body.data;
    deleteEmployer(employerId, (err, results) => {
        if (err) {
            // If an error occurs during employer deletion, return 500 Internal Server Error
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        // If successful, return 200 Created along with a success message and employer ID
        res.status(200).json({ message: 'Employer deleted successfully', employerId: results.employerId });
        return console.log("Employer deleted successfully");
    });
});

// Route to fetch all employers
router.get('/api/get-employers', (req, res) => {
    selectAllEmployers((err, results) => {
        if (err) {
            // If an error occurs during database query, return 500 Internal Server Error
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        // If successful, send the fetched employers as JSON response
        return res.send(results);
    });
});

// Route to fetch a specific employer by ID
router.get('/api/get-employer/:id', (req, res) => {
    // Extract employer ID from request parameters
    const employerId = req.body.data;
    selectEmployerByID(employerId, (err, results) => {
        if (err) {
            // If an error occurs during database query, return 500 Internal Server Error
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        // If successful, send the fetched employer as JSON response
        return res.send(results);
    });
});

// Route to fetch connections for an employer by ID
router.get('/api/get-employer-connections/:id', (req, res) => {
    // Extract employer ID from request parameters
    const employerId = req.params.id;
    // Call function to get connections for the specified employer
    getEmployerConnections(employerId, (err, results) => {
        // If an error occurs during fetching connections, return 500 Internal Server Error
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        // If successful, send the fetched connections as JSON response
        return res.send(results);
    });
});

module.exports = router;