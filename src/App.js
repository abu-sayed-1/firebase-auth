import React, { useState } from 'react';
import './App.css';
import *as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
firebase.initializeApp(firebaseConfig);


function App() {
  const [newUser,setNewUser] = useState(false);
  const [user,setUser] = useState({
    isSignIn:false,
    name:'',
    email:'',
    photo:'',
    password:'',
    error:''
  
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

 const handleSignOut = () => {
   firebase.auth().signOut()
   .then(res =>{
     const signedOutUser = {
       isSignIn:false,
       name:'',
       photo:'',
       email:'',
       error:'',
       success:false
   
     }
     setUser(signedOutUser)
   })
   .catch( error => {

   })
 }

const handleSubmit = (e) => {
  console.log(user.email,user.password);
  if (newUser && user.email && user.password) {
    firebase.auth().createUserWithEmailAndPassword(user.email,user.password)
      .then(res => {
        const newUserInfo = {...user} ;
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        updateUserName(user.name);
    })
    .catch(error => {
      const newUserInfo = {...user};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      setUser(newUserInfo);
    
    });
  }
  if (!newUser && user.email && user.password) {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(res => {
      const newUserInfo = {...user} ;
      newUserInfo.error = '';
      newUserInfo.success = true;
      setUser(newUserInfo);
      console.log('sign in user info', res.user);
      
    })
    .catch(error => {
      const newUserInfo = {...user};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      setUser(newUserInfo);
    });
  }
e.preventDefault();
}

const updateUserName = name => {
      var user = firebase.auth().currentUser;

    user.updateProfile({ 
      displayName: name, 

    }).then(() => {
      console.log('Update successful')
    })
    .catch( error => {
      console.log(error)
    });
}


const handleBlur = (event) => {
  let isFieldValid = true;
  if (event.target.name === 'email') {
    isFieldValid = /\S+@\S+\.\S+/.test(event.target.value); 
  }
  if (event.target.name === 'password') {
    const isPassWordValid = event.target.value.length > 5;
    const passwordHasNumber = /\d{1}/.test (event.target.value);
    isFieldValid = passwordHasNumber && isPassWordValid ;
  }
  if (isFieldValid) {
    const newUserInfo = {...user};
    newUserInfo[event.target.name] = event.target.value;
    setUser(newUserInfo);
    
  }
}

  return (
    <div style={{marginLeft:'45%',marginTop:'10%'}}>
       {
        user.isSignIn ? 
          <button onClick={handleSignOut} style={{color:'red'}}>sign out</button>
          :<button onClick={handleSingIn} style={{color:'red'}}>sign in</button>
      }
      <br/>
      <button>Sign In using Facebook</button>
      {
        user.isSignIn  && <div>
        <p>Welcome,{user.name}</p>
        <p>Email:{user.email}</p>
        <img src={user.photo} alt=""/>

      </div>
      } 
      <br/>
        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
        <label htmlFor="newUser">New User Sign up</label>
       <form onSubmit={handleSubmit}>
       {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="You Name" required />}
         <br/>
         <input type="text" name="email" onBlur={handleBlur} placeholder="Enter your Email" required/>
         <br/>
         <input type="password" name="password" onBlur={handleBlur}  id="" placeholder="Enter your password" required/>
         <br/>
         <input type="submit" value={newUser ?'Sign up':'Sign In'}/>
       </form>       
 
          <p style={{color:'red'}}>{user.error}</p>
         {user.success && <p style={{color:'green'}}>User { newUser ? "Created" :"Logged In"} SuccessFully </p>} 

     </div>
  );
}

export default App;




// Module No:42 / Video No-Update user name and other information to firebase: 1/2/3/4/5/6/7/
// function App() {
//   const [newUser,setNewUser] = useState(false);
//   const [user,setUser] = useState({
//     isSignIn:false,
//     name:'',
//     email:'',
//     photo:'',
//     password:'',
//     error:''
  
//   })

// const provider = new firebase.auth.GoogleAuthProvider();
//  const handleSingIn = () => {
//    firebase.auth().signInWithPopup(provider)
//    .then(res => {
//      const {displayName,email,photoURL} = res.user;
//      const signedInUser = {
//        isSignIn:true,
//        name:displayName,
//        email:email,
//        photo:photoURL
       
//      }
//      setUser(signedInUser)

//    })
//    .catch (error => {
//       console.log(error);
//       console.log(error.message);
//    })

//  }

//  const handleSignOut = () => {
//    firebase.auth().signOut()
//    .then(res =>{
//      const signedOutUser = {
//        isSignIn:false,
//        name:'',
//        photo:'',
//        email:'',
//        error:'',
//        success:false
   
//      }
//      setUser(signedOutUser)
//    })
//    .catch( error => {

//    })
//  }

// const handleSubmit = (e) => {
//   console.log(user.email,user.password);
//   if (newUser && user.email && user.password) {
//     firebase.auth().createUserWithEmailAndPassword(user.email,user.password)
//       .then(res => {
//         const newUserInfo = {...user} ;
//         newUserInfo.error = '';
//         newUserInfo.success = true;
//         setUser(newUserInfo);
//         updateUserName(user.name);
//     })
//     .catch(error => {
//       const newUserInfo = {...user};
//       newUserInfo.error = error.message;
//       newUserInfo.success = false;
//       setUser(newUserInfo);
    
//     });
//   }
//   if (!newUser && user.email && user.password) {
//     firebase.auth().signInWithEmailAndPassword(user.email, user.password)
//     .then(res => {
//       const newUserInfo = {...user} ;
//       newUserInfo.error = '';
//       newUserInfo.success = true;
//       setUser(newUserInfo);
//       console.log('sign in user info', res.user);
      
//     })
//     .catch(error => {
//       const newUserInfo = {...user};
//       newUserInfo.error = error.message;
//       newUserInfo.success = false;
//       setUser(newUserInfo);
//     });
//   }
// e.preventDefault();
// }

// const updateUserName = name => {
//       var user = firebase.auth().currentUser;

//     user.updateProfile({ 
//       displayName: name, 

//     }).then(() => {
//       console.log('Update successful')
//     })
//     .catch( error => {
//       console.log(error)
//     });
// }


// const handleBlur = (event) => {
//   let isFieldValid = true;
//   if (event.target.name === 'email') {
//     isFieldValid = /\S+@\S+\.\S+/.test(event.target.value); 
//   }
//   if (event.target.name === 'password') {
//     const isPassWordValid = event.target.value.length > 5;
//     const passwordHasNumber = /\d{1}/.test (event.target.value);
//     isFieldValid = passwordHasNumber && isPassWordValid ;
//   }
//   if (isFieldValid) {
//     const newUserInfo = {...user};
//     newUserInfo[event.target.name] = event.target.value;
//     setUser(newUserInfo);
    
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
//       <br/>
//         <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
//         <label htmlFor="newUser">New User Sign up</label>
//        <form onSubmit={handleSubmit}>
//        {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="You Name" required />}
//          <br/>
//          <input type="text" name="email" onBlur={handleBlur} placeholder="Enter your Email" required/>
//          <br/>
//          <input type="password" name="password" onBlur={handleBlur}  id="" placeholder="Enter your password" required/>
//          <br/>
//          <input type="submit" value={newUser ?'Sign up':'Sign In'}/>
//        </form>       
 
//           <p style={{color:'red'}}>{user.error}</p>
//          {user.success && <p style={{color:'green'}}>User { newUser ? "Created" :"Logged In"} SuccessFully </p>} 

//      </div>
//   );
// }

// export default App;








//Module No:42 /Video No:1/2/3/4/5/6/
// function App() {
//   const [newUser,setNewUser] = useState(false);
//   const [user,setUser] = useState({
//     isSignIn:false,
//     name:'',
//     email:'',
//     photo:'',
//     password:'',
//     error:''
  
//   })

// const provider = new firebase.auth.GoogleAuthProvider();
//  const handleSingIn = () => {
//    firebase.auth().signInWithPopup(provider)
//    .then(res => {
//      const {displayName,email,photoURL} = res.user;
//      const signedInUser = {
//        isSignIn:true,
//        name:displayName,
//        email:email,
//        photo:photoURL
       
//      }
//      setUser(signedInUser)

//    })
//    .catch (error => {
//       console.log(error);
//       console.log(error.message);
//    })

//  }

//  const handleSignOut = () => {
//    firebase.auth().signOut()
//    .then(res =>{
//      const signedOutUser = {
//        isSignIn:false,
//        name:'',
//        photo:'',
//        email:'',
//        error:'',
//        success:false
   
//      }
//      setUser(signedOutUser)
//    })
//    .catch( error => {

//    })
//  }

// const handleSubmit = (e) => {
//   console.log(user.email,user.password);
//   if (newUser && user.email && user.password) {
//     firebase.auth().createUserWithEmailAndPassword(user.email,user.password)
//       .then(res => {
//         const newUserInfo = {...user} ;
//         newUserInfo.error = '';
//         newUserInfo.success = true;
//         setUser(newUserInfo);
//     })
//     .catch(error => {
//       const newUserInfo = {...user};
//       newUserInfo.error = error.message;
//       newUserInfo.success = false;
//       setUser(newUserInfo);
    
//     });
//   }
//   if (!newUser && user.email && user.password) {
//     firebase.auth().signInWithEmailAndPassword(user.email, user.password)
//     .then(res => {
//       const newUserInfo = {...user} ;
//       newUserInfo.error = '';
//       newUserInfo.success = true;
//       setUser(newUserInfo);
      
//     })
//     .catch(error => {
//       const newUserInfo = {...user};
//       newUserInfo.error = error.message;
//       newUserInfo.success = false;
//       setUser(newUserInfo);
//     });
//   }
// e.preventDefault();
// }

// const handleBlur = (event) => {
//   let isFieldValid = true;
//   if (event.target.name === 'email') {
//     isFieldValid = /\S+@\S+\.\S+/.test(event.target.value); 
//   }
//   if (event.target.name === 'password') {
//     const isPassWordValid = event.target.value.length > 5;
//     const passwordHasNumber = /\d{1}/.test (event.target.value);
//     isFieldValid = passwordHasNumber && isPassWordValid ;
//   }
//   if (isFieldValid) {
//     const newUserInfo = {...user};
//     newUserInfo[event.target.name] = event.target.value;
//     setUser(newUserInfo);
    
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
//       <br/>
//         <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
//         <label htmlFor="newUser">New User Sign up</label>
//        <form onSubmit={handleSubmit}>
//        {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="You Name" required />}
//          <br/>
//          <input type="text" name="email" onBlur={handleBlur} placeholder="Enter your Email" required/>
//          <br/>
//          <input type="password" name="password" onBlur={handleBlur}  id="" placeholder="Enter your password" required/>
//          <br/>
//          <input type="submit" value="Submit"/>
//        </form>       
 
//           <p style={{color:'red'}}>{user.error}</p>
//          {user.success && <p style={{color:'green'}}>User { newUser ? "Created" :"Logged In"} SuccessFully </p>} 

//      </div>
//   );
// }

// export default App;




// Module No: 42.. video No:1/2/3/4/5/
// function App() {

//   const [user,setUser] = useState({
//     isSignIn:false,
//     name:'',
//     email:'',
//     photo:'',
//     password:'',
//     error:''
  
//   })

// const provider = new firebase.auth.GoogleAuthProvider();
//  const handleSingIn = () => {
//    firebase.auth().signInWithPopup(provider)
//    .then(res => {
//      const {displayName,email,photoURL} = res.user;
//      const signedInUser = {
//        isSignIn:true,
//        name:displayName,
//        email:email,
//        photo:photoURL
       
//      }
//      setUser(signedInUser)

//    })
//    .catch (error => {
//       console.log(error);
//       console.log(error.message);
//    })

//  }

//  const handleSignOut = () =>{
//    firebase.auth().signOut()
//    .then(res =>{
//      const signedOutUser = {
//        isSignIn:false,
//        name:'',
//        photo:'',
//        email:'',
//        error:'',
//        success:false
   
//      }
//      setUser(signedOutUser)
//    })
//    .catch( error => {

//    })
//  }

// const handleSubmit = (e) => {
//   console.log(user.email,user.password);
//   if (user.email && user.password) {
//     firebase.auth().createUserWithEmailAndPassword(user.email,user.password)
//       .then(res => {
//         const newUserInfo = {...user} ;
//         newUserInfo.error = '';
//         newUserInfo.success = true;
//         setUser(newUserInfo);
//     })
//     .catch(error => {
//       const newUserInfo = {...user};
//       newUserInfo.error = error.message;
//       newUserInfo.success = false;
//       setUser(newUserInfo);
    
//     });
//   }
// e.preventDefault();
// }

// const handleBlur = (event) => {
//   let isFieldValid = true;
//   if (event.target.name === 'email') {
//     isFieldValid = /\S+@\S+\.\S+/.test(event.target.value); 
//   }
//   if (event.target.name === 'password') {
//     const isPassWordValid = event.target.value.length > 5;
//     const passwordHasNumber = /\d{3}/.test (event.target.value);
//     isFieldValid = passwordHasNumber && isPassWordValid ;
//   }
//   if (isFieldValid) {
//     const newUserInfo = {...user};
//     newUserInfo[event.target.name] = event.target.value;
//     setUser(newUserInfo);
    
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
//          <input type="text" name="name" onBlur={handleBlur} placeholder="You Name" required />
//          <br/>
//          <input type="text" name="email" onBlur={handleBlur} placeholder="Enter your Email" required/>
//          <br/>
//          <input type="password" name="password" onBlur={handleBlur}  id="" placeholder="Enter your password" required/>
//          <br/>
//          <input type="submit" value="Submit"/>
//        </form>       
 
//           <p style={{color:'red'}}>{user.error}</p>
//          {user.success && <p style={{color:'green'}}>User Created SuccessFully </p>} 

//      </div>
//   );
// }

// export default App;
 


 
// Module No: 42.. video No:1/2/3/4/

// const handleSubmit = () => {

// }

// const handleBlur = (event) => {
//   let isFieldValid = true;
//   if (event.target.name === 'email') {
//     isFieldValid = /\S+@\S+\.\S+/.test(event.target.value); 
//   }
//   if (event.target.name === 'password') {
//     const isPassWordValid = event.target.value.length > 5;
//     const passwordHasNumber = /\d{3}/.test (event.target.value);
//     isFieldValid = passwordHasNumber && isPassWordValid ;
//   }
//   if (isFieldValid) {
//     const newUserInfo = {...user};
//     newUserInfo[event.target.name] = event.target.value;
//     setUser(newUserInfo);
    
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
//          <input type="text" name="name" onBlur={handleBlur}  id="" placeholder="Your Name" required/>
          //<br/> 
//          <input type="text" name="email" onBlur={handleBlur} placeholder="Enter your Email" required/>
//          <br/>
//          <input type="password" name="password" onBlur={handleBlur}  id="" placeholder="Enter your password" required/>
//          <br/>
//          <input type="submit" value="Submit"/>
//          </form>       

      
//      </div>
//   );
// }

// export default App;
 
 
 

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