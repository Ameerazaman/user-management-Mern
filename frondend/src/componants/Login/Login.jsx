// Login.js
import React, { useState} from 'react';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { useDispatch } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../../redux/user/userSlice';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch=useDispatch('')
    const navigate = useNavigate();

    const validation = () => {
        const new_errors = {};
        if (!email) new_errors.email = "Email is required";
        if (!password) new_errors.password = "Password is required";
        if (/\s/.test(password)) {
            new_errors.password = "Password should not contain spaces";
        }
        if (password.length < 6) {
            new_errors.password = "Password must be at least 6 characters long";
        }
        return new_errors;
    };

    const submit = async (e) => {
        e.preventDefault();
        dispatch(signInStart());
        const validationErrors = validation();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/users/login', { email, password });

            if (response.data.status === 'exist') {
                dispatch(signInSuccess(response.data.check));
                console.log(response.data.check,"gfdyhrdjth")
                localStorage.setItem('token', response.data.token);
                navigate('/home');
            } else {
                alert("User does not exist");
                navigate('/login');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div>
            <div className="card">
                <h2>Login Form</h2>
              
                <form className="form" onSubmit={submit}>
                    {errors.email && <span style={{ color: 'red' }} className="error">{errors.email}</span>}
                    <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" className="email" />
                    {errors.password && <span style={{ color: 'red' }} className="error">{errors.password}</span>}
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="pass" />
                    <button type="submit" className="login_btn">Login</button>
                </form>
                <a href="#" className="fp">Forgot password?</a>
                <div className="footer_card">
                    <p>Not a member?</p>
                    <a href="/signup">Signup now</a>
                </div>
            </div>
        </div>
    );
}

export default Login
