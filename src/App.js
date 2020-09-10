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
   .catch( error => {

   })
 }

const handleSubmit = () => {

}

const handleBlur = (event) => {
  console.log(event.target.name,event.target.value)
  if (event.target.name === 'email') {
    const isEmailValid = /\S+@\S+\.\S+/.test(event.target.value);
    console.log(isEmailValid)
  }
  if (event.target.name === 'password') {
    const isPassWordValid = event.target.value.length > 5;
    const passwordHasNumber = /\d{3}/.test (event.target.value);
    console.log(passwordHasNumber && isPassWordValid)
  }
}

  return (
    <div style={{marginLeft:'45%',marginTop:'10%'}}>
       {
        user.isSignIn ? 
          <button onClick={handleSignOut} style={{color:'red'}}>sign out</button>
          :<button onClick={handleSingIn} style={{color:'red'}}>sign in</button>
      }

      {
        user.isSignIn  && <div>
        <p>Welcome,{user.name}</p>
        <p>Email:{user.email}</p>
        <img src={user.photo} alt=""/>

      </div>


      } 
       <form onSubmit={handleSubmit}>
         <input type="text" name="email" onBlur={handleBlur} placeholder="Enter your Email" required/>
         <br/>
         <input type="password" name="password" onBlur={handleBlur}  id="" placeholder="Enter your password" required/>
         <br/>
         <input type="submit" value="Submit"/>
         </form>       

      
     </div>
  );
}

export default App;
 

// Module No: 42.. video No:1/2/3/
// const handleBlur = (event) => {
//   console.log(event.target.name,event.target.value)
//   if (event.target.name === 'email') {
//     const isEmailValid = /\S+@\S+\.\S+/.test(event.target.value);
//     console.log(isEmailValid)
//   }
//   if (event.target.name === 'password') {
//     const isPassWordValid = event.target.value.length > 5;
//     const passwordHasNumber = /\d{3}/.test (event.target.value);
//     console.log(passwordHasNumber && isPassWordValid)
//   }
// }

//   return (
//     <div style={{marginLeft:'45%',marginTop:'10%'}}>
//        {
//         user.isSignIn ? 
//           <button onClick={handleSignOut} style={{color:'red'}}>sign out</button>
//           :<button onClick={handleSingIn} style={{color:'red'}}>sign in</button>
//       }

//       {
//         user.isSignIn  && <div>
//         <p>Welcome,{user.name}</p>
//         <p>Email:{user.email}</p>
//         <img src={user.photo} alt=""/>

//       </div>


//       } 
//        <form onSubmit={handleSubmit}>
//          <input type="text" name="email" onBlur={handleBlur} placeholder="Enter your Email" required/>
//          <br/>
//          <input type="password" name="password" onBlur={handleBlur}  id="" placeholder="Enter your password" required/>
//          <br/>
//          <input type="submit" value="Submit"/>
//          </form>       

      
//      </div>