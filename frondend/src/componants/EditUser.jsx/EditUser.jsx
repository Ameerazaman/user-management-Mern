import React, { useEffect, useState } from 'react';
import '../Signup/Signup.css'; // Ensure correct path to your CSS file
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';



function EditUser() {
  const { email } = useParams(); // Get email from URL params
  const history = useNavigate();
  const token = localStorage.getItem('token');
  // State variables for user data and form errors
  var [prev,
    setPrevUser] = useState({
      email: '',
      password: '',
      username: '',
      phone: '',
    });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/api/admin/edit-user/${email}`, { headers: { Authorization: token } })
      .then(response => {
        setPrevUser(response.data);
        console.log('response.data', response.data)
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [email]);


  const validate = () => {
    const new_errors = {};
    if (!prev.username) new_errors.username = "Username is required";
    if (/\s/.test(prev.username)) new_errors.username = "Username should not contain spaces";
    if (!prev.email) new_errors.email = "Email is required";
    if (!prev.phone) new_errors.phone = "Phone is required";
    if (!/^\d{10}$/.test(prev.phone)) new_errors.phone = "Phone must be exactly 10 digits long";
    if (!prev.password) new_errors.password = "Password is required";
    if (/\s/.test(prev.password)) new_errors.password = "Password should not contain spaces";
    if (prev.password.length < 6) new_errors.password = "Password must be at least 6 characters long";
    return new_errors;
  };

  // Handle form input changes
  const handlechange = (e) => {
    const { name, value } = e.target;
    setPrevUser(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  async function submit(e) {
    e.preventDefault()
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      // Send updated user data to the backend
      const response = await axios.post(`http://localhost:5000/api/admin/edit-user/${email}`, {
        email: prev.email,
        username: prev.username,
        phone: prev.phone,
        password: prev.password
      }, { headers: { Authorization: token } })
        .then(response => {
          if (response.data === 'exist') {
            setErrors({ general: "User already exists" });
            alert("User already exists");
            history(`/edit-user/${email}`);
          } else {
            history('/dashboard');
          }
        })
    } catch (error) {
      console.error('Error updating user:', error);
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
          <h1 className="recent-Articles">Customers</h1>
         
        </div>

        <div style={{width:'50%'}} className="container table-responsive"><br />
        <div>
      <div className="card">
       <h2>Edit User</h2>
      {errors.general && <span style={{ color: 'red' }}>{errors.general}</span>}
       <form method="post" className="form" onSubmit={submit}>
         {errors.email && <span style={{ color: 'red' }} className="error">{errors.email}</span>}
           <input
            onChange={handlechange}
            value={prev.email}
            type="email"
            placeholder="Email Address"
            className="email"
            readOnly
          />
          {errors.username && <span style={{ color: 'red' }} className="error">{errors.username}</span>}
          <input
            onChange={handlechange}
            type="text"
            placeholder="Username"
            value={prev.username}
            name="username"
            className="username"
          /><br />
          {errors.phone && <span style={{ color: 'red' }} className="error">{errors.phone}</span>}
          <input
            onChange={handlechange}
            value={prev.phone}
            type="number"
            placeholder="Phone Number"
            name="phone"
            className="phone"
          /><br></br>
          {errors.password && <span style={{ color: 'red' }} className="error">{errors.password}</span>}
          <input
            onChange={handlechange}
            type="password"
            placeholder="Password"
            value={prev.password}
            name="password"
            className="password"
          />
          <button type="submit" className="login_btn">Submit</button>
        </form>
      </div>
     </div> 
        
        </div>
      </div>
    </div>
  </div>
  </div >
);
}

export default EditUser;