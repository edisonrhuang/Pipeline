import { auth, googleProvider } from "./firebase"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth"
import { useState } from "react"

const Login = () => {

     const [email, setEmail] = useState("")
     const [password, setPassword] = useState("")

     const signInWithGoogle = async () => {
          try {
               signInWithPopup(auth, googleProvider).then((userCredential) => {
                    console.log(userCredential)

                    
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