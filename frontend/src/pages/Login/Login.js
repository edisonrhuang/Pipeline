import { auth, googleProvider } from "./firebase"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth"
import { useState } from "react"
import logoImage from "./assets/logo.png"

const Login = () => {

     const [email, setEmail] = useState("")
     const [password, setPassword] = useState("")

     const signInWithGoogle = async () => {
          try {
               signInWithPopup(auth, googleProvider).then((userCredential) => {

                    userCredential.user.getIdToken().then((JWT) => {
                         fetch('http://127.0.0.1:3001/', {
                              method: 'POST',
                              headers: { 'Authorization': `${JWT}`, 'Content-Type': "application/json" },
                              body: JSON.stringify(JWT)
                         }).then((res) => res.json()).then((data) => {
                         }).catch(error => console.log("log:" + error))
                    })


               })
          } catch (err) {
               console.error(err)
          }
     }

     return (
     <div style={{backgroundImage: 'url(' + require('./assets/img.webp') + ')', backgroundSize: "cover", minHeight: "100vh"}}>
        <form style={{textAlign: 'center', fontFamily: 'Georgia'}}>
            <div class="center">
                <img src={logoImage} alt="Pipeline" style={{height: '450px', marginRight: '50px', marginTop: '-50px'}} /> <br/>
                <label class="text_label">
                    Join a network of professionals and budding talent!
                </label>
                <br/>
                <br/>
                <button class="button-30" onClick={signInWithGoogle} role="button">Login with Google</button>
            </div>
        </form>
        </div> 
     );
}

export default Login