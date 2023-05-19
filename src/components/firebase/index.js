import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhjufbtUe8x2QlPyJ2GHGsiAQpN1ETUZg",
  authDomain: "job-app-35d0c.firebaseapp.com",
  projectId: "job-app-35d0c",
  storageBucket: "job-app-35d0c.appspot.com",
  messagingSenderId: "823912254455",
  appId: "1:823912254455:web:fb3b2d38d4c94cd8627cf2",
  measurementId: "G-VGPWS6DDQ6"
};
const firebaseSApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
 const db = firebaseSApp.firestore();
 const googleProvider = new firebase.auth.GoogleAuthProvider();
 const facebookProvider = new firebase.auth.FacebookAuthProvider();
 const TwitterProvider = new firebase.auth.TwitterAuthProvider();
 const GithubProvider = new firebase.auth.GithubAuthProvider();
 const storage = firebase.storage();
export default {auth, db, storage};
export  {db, googleProvider, facebookProvider, TwitterProvider,GithubProvider};
export  {auth};
export  {storage};