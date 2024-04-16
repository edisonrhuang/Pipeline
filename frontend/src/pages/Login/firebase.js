import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyC4cGNvW2YLi4cnbxXCY8Xv1yI1lF2e_yQ",
  authDomain: "pipeline-bd63b.firebaseapp.com",
  projectId: "pipeline-bd63b",
  storageBucket: "pipeline-bd63b.appspot.com",
  messagingSenderId: "976183374212",
  appId: "1:976183374212:web:b757b13256241be515add1",
  measurementId: "G-FH14SVQXSF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app) 
export const googleProvider = new GoogleAuthProvider()