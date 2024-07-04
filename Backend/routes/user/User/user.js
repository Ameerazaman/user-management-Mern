const express = require('express');
const { userSignup, userLogin, logoutUser, profileUpdate } = require('../../../Controller/UserController');
const { upload, verifyUser } = require('../../../Middleware/middleware');
const router = express.Router();

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/logout',verifyUser,  logoutUser);
router.post('/profile-update',verifyUser, upload.single('profilepicture'),profileUpdate);

module.exports = router;