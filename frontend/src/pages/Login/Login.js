import { auth, googleProvider } from "./firebase"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth"
import { useState } from "react"

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

     return <div>

          <button onClick={signInWithGoogle}>Sign In With Google</button>
     </div>
}

export default Login