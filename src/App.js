import React, { useState } from 'react';
import './App.css';
import *as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
firebase.initializeApp(firebaseConfig);

function App() {

  const [user,setUser] = useState({
    isSignIn:false,
    name:'',
    email:'',
    photo:''
  })

const provider = new firebase.auth.GoogleAuthProvider();
 const handleSingIn = () => {
   firebase.auth().signInWithPopup(provider)
   .then(res => {
     const {displayName,email,photoURL} = res.user;
     const signedInUser = {
       isSignIn:true,
       name:displayName,
       email:email,
       photo:photoURL
       
     }
     setUser(signedInUser)

   })
   .catch (error => {
      console.log(error);
      console.log(error.message);
   })

 }

 const handleSignOut = () =>{
   firebase.auth().signOut()
   .then(res =>{
     const signedOutUser = {
       isSignIn:false,
       name:'',
       photo:'',
       email:''
     }
     setUser(signedOutUser)
   })
   .catch( error =>{

   })
 }
  return (
    <div>
      {
        user.isSignIn ?<button onClick={handleSignOut}>sign out</button>:

                      <button onClick={handleSingIn}>sign in</button>
      }

      {
        user.isSignIn  && <div><p>Welcome,{user.name}</p>
        <p>Email:{user.email}</p>
        <img src={user.photo} alt=""/>
      </div>
      }
    </div>
  );
}

export default App;
