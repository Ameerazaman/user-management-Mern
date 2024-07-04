
import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('')
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    console.log(token, "token");
    axios.get('http://localhost:5000/api/admin/dashboard', {
      headers: { Authorization: token }
    })
      .then(response => {
        console.log(response.data);
        setUsers(response.data);
        navigate('/dashboard')
      })
      .catch(error => {
        console.error('Error fetching dashboard data:', error);
        navigate('/admin')
      });
  }, [token]);

  const editUser = (email) => {
    navigate(`/edit-user/${email}`, { headers: { Authorization: token } });
  };

  const deleteUser = (email) => {
    axios.get(`http://localhost:5000/api/admin/delete-user/${email}`, {
      headers: { Authorization: token }
    })
      .then(response => {
        if (response.data === "User does not exist") {
          alert('User is not found');
        } else {
          setUsers(users.filter(user => user.email !== email));
          alert('User is deleted');
        }
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  const logout = () => {
    axios.get('http://localhost:5000/api/admin/logout', {
      headers: { Authorization: token }
    })
      .then(response => {
        if (response.data === "logout") {
          localStorage.removeItem('token');
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };
  const submit = () => {
    axios.post('http://localhost:5000/api/admin/search', { search }, {
      headers: { Authorization: token }
    })
      .then(response => {
        if (response.data.status === 'exist') {
          setUsers(response.data.data);
        } else {
          alert('User does not exist');
        }
      })
      .catch(error => {
        console.error('Error fetching search data:', error);
      });
  };
  useEffect(()=>{
    if(token){
      navigate('/dashboard')
    }
    else{
      navigate('/admin')
    }
  })
  return (
    <div> <header>

      <div class="logosec">
        <div class="logo">Users</div>
        <img src=
          "https://media.geeksforgeeks.org/wp-content/uploads/20221210182541/Untitled-design-(30).png"
          class="icn menuicn"
          id="menuicn"
          alt="menu-icon" />
      </div>

      <div class="searchbar">
        <input type="text"
          placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
        <div class="searchbtn">
          <img src=
            "https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
            class="icn srchicn"
            alt="search-icon"  onClick={submit}/>
        </div>
      </div>

      <div class="message">
        <div class="circle"></div>
        <img src=
          "https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/8.png"
          class="icn"
          alt="" />
        <div class="dp">
          <img src=
            "https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png"
            class="dpicn"
            alt="dp" />
        </div>
      </div>

    </header>

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
                <a href="/customers">
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
              <a href="/add-user"><button className='view'>Add user</button></a>
            </div>

            <div className="container table-responsive py-12"><br />
              <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Username</th>
                    <th scope="col">Image</th>

                    <th scope="col">Email</th>
                    <th scope="col">Password</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody id="customerBody">
                  {users.map((user, index) => (
                    <tr key={user._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{user.username}</td>
                      {user.profilepicture?
                      <td><img style={{width:'50px', height:'50px'}} src={`http://localhost:5000/${user.profilepicture}`} alt="" /></td>:<td></td>}
                      <td>{user.email}</td>
                      <td>{user.password}</td>
                      <td><i onClick={() => editUser(user.email)} className="fa fa-edit"></i></td>
                      <td><i onClick={() => deleteUser(user.email)} className="fa fa-trash"></i></td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
