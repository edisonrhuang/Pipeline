import express from 'express'
import { selectAllEmployers, selectEmployerByID, updateEmployer, deleteEmployer } from '../db/queries/employerQueries.js'
import { createUser } from '../db/queries/authorizationQueries.js'
import { selectAllCandidates } from '../db/queries/candidateQueries.js';
const router = express.Router();

router.get('/employer/:id', (req, res) => {
    console.log("Asdsa")
    const id = req.params.id
    selectEmployerByID(id, (err, response) => {
        res.send({ employer: response[0] })
    })
})

router.post('/employer', (req, res) => {
    const employer = req.body

    createUser(req.user.email, "Employer", employer, (err, response) => {
        res.send(response)

    })
});

router.put('/employer/:id', (req, res) => {
    const id = req.params.id
    const employer = req.body
    updateEmployer(employer, id, (err, response) => {
        res.send(response)
    })
});

router.delete('/employer/:id', (req, res) => {
    deleteEmployer(req.params.id, (err, response) => {
        
    })
});


export default router