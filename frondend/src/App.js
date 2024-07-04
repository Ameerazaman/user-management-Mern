import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './componants/Login/Login';
import Admin from './componants/Admin/Admin';
import Dashboard from './componants/Dashboard/Dashboard';
import Adduser from './componants/AddUser/Adduser';
import EditUser from './componants/EditUser.jsx/EditUser';
import Home from './componants/Home/Home';
import Profile from './componants/Profile/Profile';
import Signup from './componants/Signup/Signup';


function App() {
  return (
    <div>  
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-user" element={<Adduser />} />
          <Route path="/edit-user/:email" element={<EditUser/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/profile" element={<Profile/>} />       
        </Routes>
      </Router>
   
    </div>
  );
}

export default App;