import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext.jsx';

const LoginPage = () => {

   const [currentState, setCurrentState] = useState("Sign Up");
   const [fullName, setFullName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [bio, setBio] = useState("");
   const [isDataSubmitted, setIsDataSubmitted] = useState(false);

   const { login } = useContext(AuthContext);


   const onSubmitHandler = (event) => {
      event.preventDefault();
      if (currentState === "Sign Up" && !isDataSubmitted) {
         setIsDataSubmitted(true);
         return;
      }

      login(currentState === "Sign Up" ? 'signup' : 'login', { email, password, fullName, bio });

   }


   return (
      <div className='login-container'>
         {/* left */}
         <img src={assets.logo_big} alt="" className='w-[min(30vw,250px)]' />
         {/* right */}
         <form className='right-login' onSubmit={onSubmitHandler}>
            <h2 className='font-medium text-2xl flex justify-between items-center'>
               {currentState}
               {isDataSubmitted && <img src={assets.arrow_icon} alt=""
                  onClick={() => setIsDataSubmitted(false)} className='w-5 cursor-pointer' />}
            </h2>
            {currentState === "Sign Up" && !isDataSubmitted && (
               <input type="text" onChange={(e) => setFullName(e.target.value)} value={fullName}
                  className='p-2 border border-gray-500 rounded-md focus:outline-none' placeholder='Full Name' required />
            )}
            {!isDataSubmitted && (
               <>
                  <input type="email" placeholder='Email Address' required
                     className='input-field' onChange={(e) => setEmail(e.target.value)}
                     value={email} />
                  <input type="password" placeholder='Password' required
                     className='input-field' onChange={(e) => setPassword(e.target.value)}
                     value={password} />
               </>
            )}

            {currentState === "Sign Up" && isDataSubmitted && (
               <textarea role={4} className='textarea-form' placeholder='Provide a Short Bio...' required onChange={(e) => setBio(e.target.value)} value={bio}>
               </textarea>
            )}
            <button className='btn-form' type='submit' >
               {currentState === "Sign Up" ? "Create Account" : "Login Now"}
            </button>
            <div className='flex items-center gap-2 text-sm text-gray-500'>
               <input type="checkbox" className='cursor-pointer w-3 h-3' />
               <p>Agree to the terms of use & privacy policy.</p>
            </div>
            <div className='flex flex-col gap-2'>
               {currentState === "Sign Up" ? (
                  <p className='text-sm text-gray-600'>Already have an account?
                     <span onClick={() => setCurrentState("Login")} className='font-medium text-violet-500 cursor-pointer'> {" "}Login here</span>
                  </p>
               ) : (
                  <p className='text-sm text-gray-600'>Create an account
                     <span onClick={() => setCurrentState("Sign Up")} className='font-medium text-violet-500 cursor-pointer'>{" "}Click here?</span>
                  </p>
               )}

            </div>
         </form>
      </div>
   )
}

export default LoginPage
