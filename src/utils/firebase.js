import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
const firebaseConfig = {
  apiKey: "AIzaSyA4DdQfBN8WGXXTpMCKN6UBynuf0uQU0M0",
  authDomain: "ylc3920.firebaseapp.com",
  projectId: "ylc3920",
  storageBucket: "ylc3920.appspot.com",
  messagingSenderId: "639454240656",
  appId: "1:639454240656:web:19354d835bebb4d6af5d15",
  measurementId: "G-7NLK2MRGZ3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
export default firebase;
export const authentication = getAuth(initializeApp(firebaseConfig))