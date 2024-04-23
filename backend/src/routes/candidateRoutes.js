import express from 'express'

import {
    selectAllCandidates,
    selectCandidateByID,
    selectCandidateByFilter,
    createCandidate,
    updateCandidate,
    deleteCandidate,
    getCandidateConnections
} from '../db/queries/candidateQueries.js'

import { createSkills } from '../db/queries/skillQueries.js'
import { getUserInfo, createUser } from '../db/queries/authenticationQueries.js'
import { getEmployerConnections } from '../db/queries/employerQueries.js';

const router = express.Router();


// router.post('/candidates', (req, res) => {
//     getUserInfo(req.user.email, (err, response) => {
//         if (response != undefined){
//             response = response[0]
//             res.send(response) 
//         }
//     })
// });

router.post('/candidates/:employerId', (req, res) => {
    const employerId = req.params.employerId
    getEmployerConnections(employerId, (err, response) => {
        res.send({ candidates: response })
    })
    // selectAllCandidates((err, response) => {
    //     if (response != undefined) {
    //         console.log(response)
    //         res.send({ candidates: response })
    //     } else {
    //         res.send({ candidates: {} })
    //     }
    // })
});

router.get('/candidates', (req, res) => {
    selectAllCandidates((err, response) => {
        res.send(response)
    })
})


router.get('/candidate/:id', (req, res) => {
    const id = req.params.id
    selectCandidateByID(id, (err, response) => {
        res.send({ candidate: response[0] })
    })
});



router.post('/candidate', (req, res) => {
    const candidate = req.body
    createUser(req.user.email, "Candidate", candidate, (err, response) => {

        getUserInfo(req.user.email, (err, response) => {
            response = response[0]
            req.userType = "candidate"
            req.authorizationId = response.candidate_id
            req.doesUserExist = true
            res.send({userType : req.userType, authorizationId : req.authorizationId, doesUserExist : req.doesUserExist})

        })
    })

});

router.put('/candidate/:id', (req, res) => {
    const id = req.params.id
    const candidate = req.body
    updateCandidate(candidate, id, (err, response) => {
        res.send(response)
    })
});

router.delete('/candidate/:id', (req, res) => {
    const id = req.params.id

    deleteCandidate(id, (err, response) => {
        res.send(response)

    })
});

export default router