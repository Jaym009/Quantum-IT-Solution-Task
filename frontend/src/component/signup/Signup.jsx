import React, { useState } from 'react'
import './signup.css'
import { MdEmail } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import {request} from '../../util/fetchApi'
import {useNavigate} from 'react-router-dom'

import {FaUser, FaLock} from 'react-icons/fa'


const Signup = () => {
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [birthdate, setBirthdate] = useState("")
  // const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      const options = {
        'Content-Type': 'application/json'
      };
  
      const isoBirthdate = new Date(birthdate).toISOString().split('T')[0];
      const requestBody = {
        username,
        password,
        email,
        dateofbirth: isoBirthdate
      };
  
      const data = await request('/auth/register', 'POST', options, requestBody);
  
     
      console.log('Registration successful:', data);
      if(data){
        toast.success("Register Successfull")
        setTimeout(() => {
          navigate('/');
        }, 2000); 
      }
    } catch (error) {
      console.error('Registration error:', error);
  
      if (error.response && error.response.status === 500) {
        // Handle specific 500 error response
        alert('Internal server error occurred. Please try again later.');
      } else {
        // Handle other errors (e.g., network error)
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };
  





  return (
    <div className='wrapper'>
      <div className='form-box login'>
        
        <form onSubmit={handleRegister}>
          <h2>Registration</h2>
          <div className='input-box'>
            <FaUser className='icon'/><input type="text" placeholder='Username' onChange={(e) => setUserName(e.target.value)} required/>
          </div>
          <div className='input-box'>
            <input type="date" placeholder='Birthdate' onChange={(e) => setBirthdate(e.target.value)} required/>
          </div>
          <div className='input-box'>
            <MdEmail className='icon'/><input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} required/>
          </div>
          <div className='input-box'>
            <FaLock className='icon'/><input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} required/>
          </div>
          
          <button type='submit'>REGISTER</button><ToastContainer position="top-center" className="custom-toast-container" autoClose={2000}/>
          <div className='register-link'>
            <p>Already have an account? <a href="/">Sign In</a> </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
