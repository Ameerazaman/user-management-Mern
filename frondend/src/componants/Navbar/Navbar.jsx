import React from 'react';
import './navbar.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = useSelector((state) => state.user.currentUser);

  const logout = () => {
    axios.get('http://localhost:5000/api/users/logout', {
      headers: { Authorization: token }
    })
      .then(response => {
        if (response.data === "logout") {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          navigate('/home');
        }
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

  return (
    <div style={{ backgroundColor: 'red' }}>
      <nav className="navbar">
        <div className="navbar-container container">
          <input type="checkbox" id="navbar-toggle" />
          <div className="hamburger-lines">
            <span className="line line1"></span>
            <span className="line line2"></span>
            <span className="line line3"></span>
          </div>
          <ul className="menu-items">
            <li><a href="/home">Home</a></li>
            {user && (
              <li>
                <a href="/profile">
                  <i className="fa fa-user"></i> {user.username}
                </a>
              </li>
            )}
            <li><a onClick={logout}>Logout</a></li>
          </ul>
          <h4 style={{ color: 'blue' }}>Users Management</h4>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
