import express from 'express'
import { selectAllEmployers, selectEmployerByID, updateEmployer, deleteEmployer } from '../db/queries/employerQueries.js'
import { createUser } from '../db/queries/authorizationQueries.js'
import { selectAllCandidates } from '../db/queries/candidateQueries.js';
import { createConnection, deleteConnection } from '../db/queries/connectionsQueries.js'
const router = express.Router();

router.post('/connection', (req, res) => {
     const {employerId, candidateId} = req.body 
     createConnection(candidateId, employerId, (err, response) => {
          
     })
})

export default router 