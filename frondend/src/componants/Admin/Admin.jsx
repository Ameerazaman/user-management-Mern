import React, { useState } from 'react'
import './Admin.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Admin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState('')
  const history = useNavigate()
  const validation = () => {
    const new_errors = {}
    if (!email) new_errors.email = "Email is required"
    if (!password) new_errors.password = "Password is required"
    if (/\s/.test(password)) {
      new_errors.password = "Password should not contain spaces";
    }
    if (password.length < 6) {
      new_errors.password = "Password must be at least 6 digits long";
    }
    return new_errors
  }
  async function submit(e) {
    const validationErrors = validation();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    e.preventDefault()
    try {
      console.log("admin route")
      axios.post('http://localhost:5000/api/admin/admin', { email, password })
        .then((response) => {
          if (response.data.status === 'exist') {
            console.log(response.data.token,"token admin")
            localStorage.setItem('token', response.data.token);
            history('/dashboard')
          }
          else if (response.data === "Password is incorrect") {
            alert("password is not correct")
            history('/admin')
          }
          else if (response.data === "Email is not correct") {
            alert("Email is not correct")
            history('/admin')
          }
        })
    }
    catch (error) {
      console.log(error)
    }
  }


  return (
    <div>
      <div >
        <div class="card">
          <h2>Admin Login</h2>

          <form class="form">
            {errors.email && <span style={{ color: 'red' }} className="error">{errors.email}</span>}
            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Adress" class="email"></input>
            {errors.password && <span style={{ color: 'red' }} className="error">{errors.password}</span>}
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" class="pass" />
          </form>

          <button onClick={submit} type="button" class="login_btn">Login</button>

        </div>
      </div>
    </div>
  )
}

export default Admin
