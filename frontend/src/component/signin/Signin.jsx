import React, { useState } from 'react'
import './signin.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
// import {login} from '../../redux/authSlice'
import {request} from '../../util/fetchApi'
import {useNavigate} from 'react-router-dom'
// import {useDispatch} from 'react-redux'
import {FaUser, FaLock} from 'react-icons/fa'


const Signin = () => {
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
 
  // const [message, setMessage] = useState('');
  // const dispatch = useDispatch()
  const navigate = useNavigate()
  

  
  

  const handleLogin = async(e) => {
    e.preventDefault()
   
    try {
      const options = {
        'Content-Type': 'application/json'
      };
  
      const data = await request('/auth/login', "POST", options, { username, password });
      console.log(data)
      // Assuming the API returns a status indicating success or failure
      if(data){
      toast.success("Login Successfull")
      setTimeout(() => {
        navigate('/user');
      }, 2000);
      } 
      
     

    } catch (error) {
      console.error(error)
      toast.error("Invalid Username or Password")
    }
  }


  return (
    <div className='wrapper'>
      <div className='form-box login'>
        
        <form onSubmit={handleLogin}>
          <h2>SIGN IN</h2>
          <div className='input-box'>
            <FaUser className='icon'/><input type="text" placeholder='Username' onChange={(e) => setUserName(e.target.value)} required/>
          </div>
          <div className='input-box'>
            <FaLock className='icon'/><input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} required/>
          </div>
          <div className='remember-forgot'>
            <label><input type="checkbox" />Remember me</label>
            <a href="#">Forget Password?</a>
          </div>
          <button type='submit'>LOGIN</button><ToastContainer position="top-center" className="custom-toast-container" autoClose={2000}/>
          <div className='register-link'>
            <p>Don't have an account? <a href="/signup">Register</a> </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signin
