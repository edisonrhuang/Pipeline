import admin from 'firebase-admin'
import serviceAccount from '../../firebase-admin-key.json'  assert {type : "json"};
import {getUserInfo} from '../db/queries/authorizationQueries.js';

admin.initializeApp({
     credential: admin.credential.cert(serviceAccount)
});

const Authentication = (req, res, next) => {

     const idToken = req.headers.authorization;
     if (!idToken) {
          return res.status(403).send('Unauthorized');
     }

     admin.auth().verifyIdToken(idToken)
          .then(decodedToken => {
               req.user = decodedToken;
               console.log(req.user.email)
               getUserInfo(req.user.email, (err, response) => {
                    if (response == undefined) {
                    console.log(response)
                        console.log("DOESNT EXIST")
                        req.doesUserExist = false 
                        next()
            
                    } else {
                        console.log("EXIST")
                        if (response?.candidate_id) {
                            req.userType = "candidate"
                            req.authorizationId = response.candidate_id
                        } else if (response?.employer_id) {
                            req.userType = "employer"
                            req.authorizationId = response.employer_id
                        }
                        req.doesUserExist = true 

                        next();

                    }
            
                })
          })
          .catch(error => {
               console.error('Error verifying token:', error);
               return res.status(403).send('Unauthorized');
          });
}

export default Authentication