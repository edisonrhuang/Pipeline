import { auth, googleProvider } from "./firebase"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth"
import { useState } from "react"
import { redirect, useNavigate } from "react-router-dom"


const Login = () => {

     const [email, setEmail] = useState("")
     const [password, setPassword] = useState("")
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
                              console.log(data)
                              if (data.exist == false)
                                   navigate("/employerorcandidate")
                              else
                                   navigate("/")
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