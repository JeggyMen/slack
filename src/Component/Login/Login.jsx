import React, { useState } from 'react'
import "../Login/Login.css"
import { Link } from 'react-router-dom';

function Login() {

        const [email, setEmail] =useState();
        const [password, setPassword] =useState();

        const handleLogin = () =>{
            alert("Login Succesful");
        }


  return (
<div className='row g-0 vh-100 justify-content-center align-items-center login-container'>

    <div className='col-10 row g-0 align-items-center border rounded-2 border-shadow bg-white'>

        <div className='d-none d-md-block col-6'>

        <img src={`${process.env.PUBLIC_URL}/assets/images/slack1.png`} alt='Description of image' className='image-small' />
        </div>
            <form className="col-12 col-md-6 py-4 px-3">
                <h4 className='login-title text-center py-2 mb-2'>Login</h4>
                <div className='form-floating mb-3'>
                    <input type="email" className='form-control' id="email" placeholder='name@example.com' required onChange={(e) => {setEmail( e.target.value)}}/>
                    <label htmlFor="email">Email</label>
                </div>
                <div className='form-floating mb-3'>
                    <input type="password" className='form-control' id="password" placeholder='password' required onChange={(e) => {setPassword( e.target.value)}}/>
                    <label htmlFor="password">Password</label>
                </div>
           
                <div className='text-center'>
                    <button className='login-btn py-3 rounded-3' onClick={()=>{handleLogin()}}>Login </button>
                </div>
                <div className='text-center mt-4'>
                    Not Registered? <Link to="/Signup">Sign Up</Link>
                </div>
            </form>
    </div>
</div>
  )
}

export default Login