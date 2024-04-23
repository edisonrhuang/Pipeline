import express from 'express'
import { selectAllEmployers, selectEmployerByID, updateEmployer, deleteEmployer } from '../db/queries/employerQueries.js'
import { getUserInfo, createUser } from '../db/queries/authorizationQueries.js'
import { getCandidateConnections, selectAllCandidates } from '../db/queries/candidateQueries.js';
const router = express.Router();

router.get('/employers/:candidateId', (req, res) => {
    const candidateId = req.params.candidateId
    getCandidateConnections(candidateId, (err, response) => {
        res.send({ employers: response })
    })
})

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
        // res.send(response)
        getUserInfo(req.user.email, (err, response) => {
            response = response[0]
            req.userType = "employer"
            req.authorizationId = response.employer_id
            req.doesUserExist = true
            res.send({ userType: req.userType, authorizationId: req.authorizationId, doesUserExist: req.doesUserExist })
        })
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
        res.send(response)
    })
});


export default router