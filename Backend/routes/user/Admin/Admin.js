const express = require('express');
 const { doLogin, getDashboard, addUser, editUser, postEditUser, deleteUser, logoutAdmin, searchUser } = require('../../../Controller/AdminController');
 const {verifyJWT} = require('../../../Middleware/middleware');
// const { doLogin } = require('../../../Controller/AdminController');

const router = express.Router();

// Admin Login
router.post('/admin', doLogin)
// Get dashbaord
router.get('/dashboard',verifyJWT,getDashboard)
// add user
router.post("/add-user",verifyJWT,addUser)
// edit user
router.get('/edit-user/:email', verifyJWT,editUser)
// post Edit user
router.post("/edit-user/:email",verifyJWT,postEditUser)
// delete user
router.get('/delete-user/:email',verifyJWT,deleteUser)
// logout Admin
router.get('/logout',verifyJWT,logoutAdmin)
// search
router.post('/search',verifyJWT,searchUser)
module.exports = router;