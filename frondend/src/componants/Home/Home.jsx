import React, { useEffect } from 'react';
import './Home.css';
import Navbar from '../Navbar/Navbar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Home() {
  const user = useSelector((state) => state.user);
  const navigate=useNavigate()
  useEffect(() => {
    if(user){
      navigate('/home')
    }
    else{
      navigate('/login')
    }
  })
  return (
    <div>
      <Navbar />

      <div className="shadow-div">
        <div className="shadow-content">

          <h1>Welcome To Users</h1>
          <p>We are a team of dedicated professionals committed to providing exceptional service.</p>
          <button className='btn-btn'>Continue</button>
        </div>
      </div>

      <div>
      </div>
    </div>
  );
}

export default Home;


