import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        const new_errors = {};
        if (!username) new_errors.username = "Username is required";
        if (/\s/.test(username)) new_errors.username = "Username should not contain spaces";
        if (!email) new_errors.email = "Email is required";
        if (!phone) new_errors.phone = "Phone is required";
        if (!/^\d{10}$/.test(phone)) new_errors.phone = "Phone must be exactly 10 digits long";
        if (!password) new_errors.password = "Password is required";
        if (/\s/.test(password)) new_errors.password = "Password should not contain spaces";
        if (password.length < 6) new_errors.password = "Password must be at least 6 characters long";
        if (confirmPass !== password) new_errors.confirmPassword = "Passwords do not match";
        return new_errors;
    };

    async function submit(e) {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/users/signup', { email, username, phone, password })

            ;
            if (response.data.status=== 'exist') {
                setErrors({ general: "User already exists" });
                alert("User already exists");
                history('/signup');
            } else {
                localStorage.setItem('token', response.data.token);
                history('/login');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="card">
                <h2>Signup</h2>
                {errors.general && <span style={{ color: 'red' }}>{errors.general}</span>}
               
                <form method='post' className="form" onSubmit={submit}>
                    {errors.email && <span style={{ color: 'red' }} className="error">{errors.email}</span>}
                    <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" className="email" />
                    {errors.username && <span style={{ color: 'red' }} className="error">{errors.username}</span>}
                    <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" className="username" /><br></br>
                    {errors.phone && <span style={{ color: 'red' }} className="error">{errors.phone}</span>}
                    <input onChange={(e) => setPhone(e.target.value)} type="number" placeholder="Phone Number" className="pass" />
                    {errors.password && <span style={{ color: 'red' }} className="error">{errors.password}</span>}
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="pass" />
                    {errors.confirmPassword && <span style={{ color: 'red' }} className="error">{errors.confirmPassword}</span>}
                    <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" className="confirm_pass" /><br></br>
                    <a href="/login" className="fp">You have accound? signIn</a>
                    <button type="submit" className="login_btn">Signup</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;

