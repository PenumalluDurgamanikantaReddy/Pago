import {initializeApp} from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
// import "firebase/compat/firestore";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBjTvVq4asKmcN1sZoAwjTA9lznLDzxxiA",
    authDomain: "crypto-daily-42d0b.firebaseapp.com",
    projectId: "crypto-daily-42d0b",
    storageBucket: "crypto-daily-42d0b.appspot.com",
    messagingSenderId: "442527386579",
    appId: "1:442527386579:web:28d4a4f87561a9723f3d26",
    measurementId: "G-F9CJYXZ3C5"
  };

  const app =initializeApp(firebaseConfig)

  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const db = getFirestore(app); 
  export {auth,provider,db}


  






