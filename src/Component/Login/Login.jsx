import React, { useState, useEffect } from 'react';
import "../Login/Login.css";
import { Link } from 'react-router-dom';
import MainPage from '../../MainPage/MainPage';
import { API_URL } from '../Constants/Constants';
import axios from 'axios';

function Login() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));

    useEffect(() => {
        if (user) {
            setIsLoggedIn(true);
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user]);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password) {
            return alert("Invalid Credentials");
        }
        try {
            const loginCredentials = {
                email,
                password
            };

            const response = await axios.post(`${API_URL}/auth/sign_in`, loginCredentials);
            const { data, headers } = response;
            if (data && headers) {
                const accessToken = headers['access-token'];
                const expiry = headers['expiry'];
                const client = headers['client'];
                const uid = headers['uid'];

                setUser({
                    accessToken,
                    expiry,
                    client,
                    uid,
                    id: data.data.id
                });

                setIsLoggedIn(true);
            }
        } catch (error) {
            if (error.response.data.errors)
                return alert("Invalid Credentials");
        }
    };

    return (
        <div className='row g-0 vh-100 justify-content-center align-items-center login-container'>
            {!isLoggedIn &&
                <div className='col-10 row g-0 align-items-center border rounded-2 border-shadow bg-white'>
                    <div className='d-none d-md-block col-6'>
                        <img src={`${process.env.PUBLIC_URL}/assets/images/slack1.png`} alt='Description of image' className='image-small' />
                    </div>
                    <form onSubmit={handleSubmit} className="col-12 col-md-6 py-4 px-3">
                        <h4 className='login-title text-center py-2 mb-2'>Login</h4>
                        <div className='form-floating mb-3'>
                            <input type="email" className='form-control' id="email" placeholder='name@example.com' required onChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input type="password" className='form-control' id="password" placeholder='password' required onChange={(e) => setPassword(e.target.value)} />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className='text-center'>
                            <button type="submit" className='login-btn py-3 rounded-3'>Login</button>
                        </div>
                        <div className='text-center mt-4'>
                            Not Registered? <Link to="/Signup">Sign Up</Link>
                        </div>
                    </form>
                </div>
            }
            {isLoggedIn && <MainPage setIsLoggedIn={setIsLoggedIn} user={user}></MainPage>}
        </div>
    );
}

export default Login;