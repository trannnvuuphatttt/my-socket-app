// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDq1immgd9S3KMSgHfa5f5DiSAmWQ7VHAw",
  authDomain: "my-socket-app.firebaseapp.com",
  projectId: "my-socket-app",
  storageBucket: "my-socket-app.appspot.com",
  messagingSenderId: "191123573340",
  appId: "1:191123573340:web:d0985fa716919417bb3499",
  measurementId: "G-WF9L2P0FQL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
//const analytics = getAnalytics(app);
const db = getFirestore(app);

export {auth, db} ;

// Khởi tạo Firebase
//const app = initializeApp(firebaseConfig);

// Khởi tạo dịch vụ
//export const auth = getAuth(app);
//export const db = getFirestore(app);