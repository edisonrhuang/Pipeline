import express from 'express'
import cors from 'cors'
import authentication from './src/middleware/Authentication.js'
import employerRoutes from './src/routes/EmployerRoutes.js'
import candidateRoutes from './src/routes/CandidateRoutes.js'
import skillRoutes from './src/routes/skillRoutes.js'
const app = express();


app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(authentication)

app.use(employerRoutes)
app.use(candidateRoutes) 
app.use(skillRoutes)

app.post('/', (req, res) => {
    console.log(req)
    
    res.send({doesUserExist : req.doesUserExist, userType : req.userType, authorizationId : req.authorizationId});
});


// app.post('/login', (req, res) => {


//     getUserInfo(req.user.email, (err, response) => {
//         if (response == undefined) {
//             console.log("DOESNT EXIST")
//             res.send({ doesUserExist: 0 })

//         } else {
//             console.log("EXIST")
//             if (response?.candidate_id) {
//                 res.send({ doesUserExist: 1 })

//             } else if (response?.employer_id) {
//                 res.send({ doesUserExist: 2 })

//             }

//         }

//     })
// })



app.get('/', (req, res) => {
    res.send("<h1>Backend Running<h1>");
});

// app.use(candidateRoutes);

app.listen(5002, () => {
    console.log('Server is running on port 5002');
})