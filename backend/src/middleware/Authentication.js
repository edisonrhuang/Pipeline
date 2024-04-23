import admin from 'firebase-admin'
import serviceAccount from '../../firebase-admin-key.json'  assert {type: "json"};
import { getUserInfo } from '../db/queries/authorizationQueries.js';

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
                         req.doesUserExist = false
                         next()

                    } else {
                         response = response[0]
                         if ("candidate_id" in response) {
                              req.userType = "candidate"
                              req.authorizationId = response.candidate_id
                         } else if ("employer_id" in response) {
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