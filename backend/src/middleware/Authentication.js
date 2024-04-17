import admin from 'firebase-admin'
import serviceAccount from '../../firebase-admin-key.json'  assert {type : "json"};

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
               next();
          })
          .catch(error => {
               console.error('Error verifying token:', error);
               return res.status(403).send('Unauthorized');
          });
}

export default Authentication