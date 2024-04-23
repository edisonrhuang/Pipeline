import express from 'express'
import { selectAllEmployers, selectEmployerByID, updateEmployer, deleteEmployer } from '../db/queries/employerQueries.js'
import { createUser } from '../db/queries/authenticationQueries.js'
import { selectAllCandidates } from '../db/queries/candidateQueries.js';
import { createConnection, deleteConnection } from '../db/queries/connectionQueries.js'
const router = express.Router();

router.post('/connection', (req, res) => {
     const {employerId, candidateId} = req.body 
     createConnection(candidateId, employerId, (err, response) => {
          res.send(response)
     })
})

router.delete('/connection', (req, res) => {
     const {employerId, candidateId} = req.body 
     deleteConnection(candidateId, employerId, (err, response) => {
          res.send(response)
     })
})

export default router 