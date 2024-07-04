import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import './Profile.css';
import axios from 'axios';
import {
    updateUserStart,
    updateUserFailure,
    updateUserSuccess,
} from '../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const fileRef = useRef(null);
    const user = useSelector((state) => state.user.currentUser);
    const [image, setImage] = useState(user && user.profilepicture ? `http://localhost:5000/${user.profilepicture.replace(/\\/g, '/')}` : null);
    const [selectFile, setSelectFile] = useState(null);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const [phone, setPhone] = useState(user.phone);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validate = () => {
        const new_errors = {};
        if (!username) new_errors.username = "Username is required";
                if (!email) new_errors.email = "Email is required";
        if (!phone) new_errors.phone = "Phone is required";
        if (!/^\d{10}$/.test(phone)) new_errors.phone = "Phone must be exactly 10 digits long";
        if (!password) new_errors.password = "Password is required";
        if (/\s/.test(password)) new_errors.password = "Password should not contain spaces";
        if (password.length < 6) new_errors.password = "Password must be at least 6 characters long";
               return new_errors;
    };


    useEffect(() => {
        console.log(user, "user", image);
    }, [user]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('phone', phone);
        if (selectFile) {
            formData.append('profilepicture', selectFile);
        }

        const token = localStorage.getItem("token");

        dispatch(updateUserStart());
        axios
            .post('http://localhost:5000/api/users/profile-update', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: token,
                    "User-Id": user._id,
                },
            })
            .then((res) => {
                console.log(res.data, "data in profile");
                dispatch(updateUserSuccess(res.data.user));
                navigate('/profile');
                alert('Profile updated')
            })
            .catch((err) => {
                dispatch(updateUserFailure(err));
            });
    };

    return (
        <div>
            <Navbar />
            <div style={{ top: '100px', marginBottom: '100px' }} className="shadow-content">
                <h3>My Profile</h3>
                <form method='post' onSubmit={handleSubmit}>
                    <div className="profile-container">
                        <div className="upload-section">
                            <div className="image-preview">
                                {image ? (
                                    <img src={image} alt="Profile Preview" className="preview-image" />
                                ) : (
                                    <div className="preview-placeholder">
                                        {user && user.profilepicture && (
                                            <img
                                                src={`http://localhost:5000/${user.profilepicture.replace(/\\/g, '/')}`}
                                                alt="profile"
                                                className="h-24 w-24 self-center rounded-full object-cover cursor-pointer"
                                                onClick={() => fileRef.current.click()}
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                           
                            <input
                                type="file"
                                ref={fileRef}
                                id="profilepicture"   
                                accept="image/*"
                                onChange={handleImageChange}
                                name='profilepicture'
                            />
                        </div>
                        <div className="details-section">
                            <i className='fa fa-edit edit-icon'></i>
                            <div className="details-content">
                                <label htmlFor="">Username</label><br />

                                <input
                                    className='profile-data'
                                    type="text"
                                    name="username"
                                    placeholder='Username'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                /><br></br>
                                {errors.username ? <span style={{ color: 'red' }} className="error">{errors.username}</span> : <br></br>}                            
                                <label>Email</label><br />
                                <input
                                    className='profile-data'
                                    type="email"
                                    name="email"
                                    placeholder='Email'
                                    value={email}
                                    readOnly
                                /><br /><br />
                                <label htmlFor="">Mobile Phone</label><br />
                                <input
                                    className='profile-data'
                                    type="text"
                                    name="phone"
                                    placeholder='Mobile Number'
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                /><br />
                                {errors.phone ? <span style={{ color: 'red' }} className="error">{errors.phone}</span>:<br />}
                              
                                <label htmlFor="">Password</label><br />
                                <input
                                    className='profile-data'
                                    type="password"
                                    name="password"
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                /><br />
                                {errors.password ? <span style={{ color: 'red' }} className="error">{errors.password}</span>:<br />}
                                <button className='btn-btn'>Edit and Save</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Profile;
