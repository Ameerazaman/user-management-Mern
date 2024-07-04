
const { secretKey } = require('../Auth/Jwtkey');
const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const multer = require('multer');
// ***********************signup**************************
const userSignup = async (req, res) => {
  const { email, username, phone, password } = req.body;
  try {
    console.log('hai')
    const check = await User.findOne({ email: email })
    if (check) {
      res.json("exist")
    }
    else {
      const newUser = new User({ email, username, phone, password })
      const token = jwt.sign({ userId: email }, secretKey, { expiresIn: '1h' });
      res.cookie("jwt", token);
      await newUser.save()
      const check = await User.findOne({ email: email })

      res.json({ status: "not-exist", check });

    }
  }
  catch (error) {
    console.log(error)
  }
}
// ***********************Login***********************

const userLogin = async (req, res) => {
  console.log('hai')
  const { email, password } = req.body
  console.log(req.body, "req.body")
  try {
    console.log(email, password, "in login")
    const check = await User.findOne({ email: email })

    if (check) {
      const token = jwt.sign({ userId: email }, secretKey, { expiresIn: '1h' });
      res.cookie("jwt", token);
      res.json({ status: "exist", token, check });
    }
    else {
      res.json('not-exist')
    }
  }
  catch (error) {
    console.log(error)
  }
}

// Logout
const logoutUser = async (req, res) => {
  try {
    res.json('logout')
  }
  catch (error) {
    console.log(error)
  }
}

const profileUpdate = async (req, res) => {
  try {
      const { username, email, phone, password } = req.body;
      const profilePicture = req.file ? req.file.path : null;
      console.log(profilePicture, "profilepicture");

      const updateData = { username, email, phone, password };
      if (profilePicture) {
          updateData.profilepicture = profilePicture;
      }

      const user = await User.findByIdAndUpdate(req.headers['user-id'], updateData, { new: true });

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.json({ user });
  } catch (error) {
      console.log(error, "error in profile update");
      res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  userLogin,
  userSignup,
  logoutUser,
  profileUpdate
}