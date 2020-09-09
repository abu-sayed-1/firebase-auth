import React from 'react';
import './App.css';
import *as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
firebase.initializeApp(firebaseConfig);

function App() {
const provider = new firebase.auth.GoogleAuthProvider();
 const handleSingIn = () => {
   firebase.auth().signInWithPopup(provider)
   .then(res => {
     const {displayName,email} = res.user;
     console.log(displayName,email);
   })
 }
  return (
    <div>
      <button onClick={handleSingIn}>sign in</button>
    </div>
  );
}

export default App;
