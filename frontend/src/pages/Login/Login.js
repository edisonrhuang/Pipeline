import { auth, googleProvider } from "./firebase"
import { signInWithPopup, signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import logoImage from "./assets/logo.png"


const Login = () => {

     const navigate = useNavigate()
     const signInWithGoogle = async () => {

          try {
               signInWithPopup(auth, googleProvider).then((userCredential) => {

                    userCredential.user.getIdToken().then((JWT) => {
                         console.log(JWT)
                         fetch('http://127.0.0.1:5002/', {
                              method: 'POST',
                              headers: { 'Authorization': `${JWT}`, 'Content-Type': "application/json" },
                              body: ''
                         }).then((res) => res.json()).then((data) => {
                              sessionStorage.setItem('JWT', JWT);
                              sessionStorage.setItem('id', data.authorizationId);
                              sessionStorage.setItem('userType', data.userType);

                              console.log(data)

                              if (data.doesUserExist == false)
                                   navigate("/employerorcandidate")
                              else if (data.userType == "candidate") {
                                   navigate("/candidatedashboard")
                              } else if (data.userType == "employer") {
                                   navigate("/employerdashboard")
                              }
                         }).catch(error => console.log("log:" + error))
                    })


               })
          } catch (err) {
               console.error(err)
          }
     }

     return <div>

          <div style={{ backgroundImage: 'url(' + require('./assets/img.webp') + ')', backgroundSize: "cover", minHeight: "100vh" }}>
               <div style={{ textAlign: 'center', fontFamily: 'Georgia' }}>
                    <div class="center">
                         <img src={logoImage} alt="Pipeline" style={{ height: '450px', marginRight: '50px', marginTop: '-50px' }} /> <br />
                         <label class="text_label">
                              Join a network of professionals and budding talent!
                         </label>
                         <br />
                         <br />
                         <button class="button-30" onClick={signInWithGoogle} role="button">Login with Google</button>
                    </div>
               </div>
          </div>

     </div>
}

export default Login