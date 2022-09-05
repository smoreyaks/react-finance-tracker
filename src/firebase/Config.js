// Firebase
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA4C1ojRPSaVEsgdYibFqRt6KxIYtCLG0o",
    authDomain: "cash-track-8f22e.firebaseapp.com",
    projectId: "cash-track-8f22e",
    storageBucket: "cash-track-8f22e.appspot.com",
    messagingSenderId: "75113417971",
    appId: "1:75113417971:web:7e0b26b083ebe4bc987b86"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialise Services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

// Timestamp
const timestamp = firebase.firestore.Timestamp()


export { projectFirestore, projectAuth, timestamp }
