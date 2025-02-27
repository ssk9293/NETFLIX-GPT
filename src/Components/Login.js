import React, {useState, useRef} from 'react'
import Header from './Header'
import { checkValidData } from '../Utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../Utils/firebase";
import { BG_URL } from '../Utils/constant';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage,setErrorMessage]=useState(null);

  const name=useRef(null);
  const email=useRef(null);
  const password=useRef(null);

  const handleButtonClick=()=>{
    const message=checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if(message) return;

    //Sign Up Form Logic
    if(!isSignInForm){
createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    const user=userCredential.user;
  })
  .catch((error) => {
    const errorMessage = error.message;
    setErrorMessage("errorMessage");
    // ..
  });
}
 else {

  //Sign In Logic
  signInWithEmailAndPassword(auth, email.current.value, password.current.value)
.then((userCredential)=>{
  const user=userCredential.user;

})
.catch((error) => {
    const errorMessage = error.message;
    setErrorMessage("User Not Found");
  });
}
  };

  const toggleSignInForm = () => {setIsSignInForm(!isSignInForm);

   };
  return (
    <div>
        <Header />
        <div className='absolute'>
 <img src={BG_URL} alt="logo"/>
        </div>
        <form onSubmit={(e)=>e.preventDefault()} className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80'>
        <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}
          
        </h1>
        {!isSignInForm &&(<input  ref={name}  type="text" placeholder="Full Name" className="p-4 my-4 w-full bg-gray-800 rounded-lg"/>)}
            <input ref={email} type="text" placeholder="Email Address" className="p-4 my-4 w-full bg-gray-800 rounded-lg"/>
            <input ref={password} type="password" placeholder="Password" className="p-4 my-4 w-full bg-gray-800 rounded-lg"/>
            <p className='text-red-500 '>{errorMessage}</p>
            <button className="p-3 my-4 bg bg-red-600 w-full rounded-lg" onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
            <p className="p-3" cursor-pointer onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now."}

            </p>
        </form>
       
    </div>
  )
}

export default Login