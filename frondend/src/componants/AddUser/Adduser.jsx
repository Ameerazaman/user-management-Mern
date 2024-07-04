import React, { useState } from 'react'
import '../Signup/Signup.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


function Adduser() {
    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const token = localStorage.getItem('token');
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
            console.log(token, "adduser")
            const response = await axios.post('http://localhost:5000/api/admin/add-user',
                { email, username, phone, password },
                { headers: { Authorization: token } }
            );
            if (response.data === 'exist') {
                setErrors({ general: "User already exists" });
                alert("User already exists");
                console.log("exist add user")
                history('/add-user');
            } else {
                console.log("save user")
                history('/dashboard');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const logout = () => {
        axios.get('http://localhost:5000/api/admin/logout', {
            headers: { Authorization: token }
        })
            .then(response => {
                if (response.data === "logout") {
                    localStorage.removeItem('token');
                    history('/admin');
                } else {
                    history('/dashboard');
                }
            })
            .catch(error => {
                console.error('Error logging out:', error);
            });
    };

    return (
        <div>
          
        <div className="main-container">
            <div className="navcontainer">
                <nav className="nav">
                    <div>
                        <div style={{ backgroundColor: 'rgb(47, 47, 189)' }} className="option1 nav-option">

                            <h5 style={{ color: 'white' }}> Main Menu</h5>
                        </div>

                        <div className="option2 nav-option">
                            {/* <img src="/images/dashboard.png" className="nav-img" alt="dashboard" /> */}
                            <a href="/admin/dashboard">
                                <h5> Dashboard</h5>
                            </a>
                        </div>

                        <div className="option2 nav-option">
                            {/* <img src="/images/products.png" className="nav-img" alt="articles" /> */}
                            <a href="/admin/product">
                                <h5>Products</h5>
                            </a>
                        </div>

                        <div className="nav-option option3">
                            {/* <img src="/images/catogary.png" className="nav-img" alt="report" /> */}
                            <a href="/admin/category">
                                <h5>Category</h5>
                            </a>
                        </div>

                        <div className="nav-option option4">
                            {/* <img src="/images/order.png" className="nav-img" alt="institution" /> */}
                            <a href="/order">
                                <h5>Orders</h5>
                            </a>
                        </div>

                        <div className="nav-option option5">
                            {/* <img src="/images/new coupon.png" className="nav-img" alt="blog" /> */}
                            <a href="/coupon">
                                <h5>Coupon</h5>
                            </a>
                        </div>

                        <div className="nav-option option6">
                            {/* <img src="/images/coupon.png" className="nav-img" alt="settings" /> */}
                            <a href="/referaloffer">
                                <h5> Offer</h5>
                            </a>
                        </div>
                        <div className="nav-option option6">
                            {/* <img src="/images/customers.png" className="nav-img" alt="settings" /> */}
                            <a href="/dashboard">
                                <h5>Customers</h5>
                            </a>
                        </div>

                        <div className="nav-option logout">
                            {/* <img src="/images/logout.png" className="nav-img" alt="logout" /> */}
                            <a onClick={logout}>
                                <h5>Logout</h5>
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="main">
                <div className="searchbar2">
                    <input type="text" placeholder="Search" />
                    <div className="searchbtn">
                        <img src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png" className="icn srchicn" alt="search-button" />
                    </div>
                </div>

                <div className="report-container">
                    <div className="report-header">
                        <h1 className="recent-Articles">Add New User</h1>

                    </div>

                    <div style={{ width: '50%' }} className="container table-responsive"><br />
                        <div>
                            <div className="card">
                                <h2>Add User</h2>
                                {errors.general && <span style={{ color: 'red' }}>{errors.general}</span>}

                                <form method='post' className="form" onSubmit={submit}>
                                    {errors.email && <span style={{ color: 'red' }} className="error">{errors.email}</span>}
                                    <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" className="email" />
                                    {errors.username && <span style={{ color: 'red' }} className="error">{errors.username}</span>}                   <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" className="username" /><br></br>                    {errors.phone && <span style={{ color: 'red' }} className="error">{errors.phone}</span>}
                                    <input onChange={(e) => setPhone(e.target.value)} type="number" placeholder="Phone Number" className="pass" />
                                    {errors.password && <span style={{ color: 'red' }} className="error">{errors.password}</span>}
                                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="pass" />
                                    {errors.confirmPassword && <span style={{ color: 'red' }} className="error">{errors.confirmPassword}</span>}
                                    <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" className="confirm_pass" /><br></br>

                                    <button type="submit" className="login_btn">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Adduser;