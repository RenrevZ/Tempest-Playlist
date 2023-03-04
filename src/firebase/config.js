import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDjr4Hgjf8RFEwAUnRUQWd9kZSRLgzrfp4",
    authDomain: "rimiru-playlist.firebaseapp.com",
    projectId: "rimiru-playlist",
    storageBucket: "rimiru-playlist.appspot.com",
    messagingSenderId: "979131474022",
    appId: "1:979131474022:web:c5ff43be9bab609496cda7"
};

firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore =  firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// generate timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore,projectAuth,projectStorage,timestamp}