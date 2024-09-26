// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDq1immgd9S3KMSgHfa5f5DiSAmWQ7VHAw",
  authDomain: "my-socket-app.firebaseapp.com",
  projectId: "my-socket-app",
  storageBucket: "my-socket-app.appspot.com",
  messagingSenderId: "191123573340",
  appId: "1:191123573340:web:d0985fa716919417bb3499",
  measurementId: "G-WF9L2P0FQL"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db} ;

