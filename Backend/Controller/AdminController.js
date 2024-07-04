
const { secretKey } = require('../Auth/Jwtkey');
const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()
const adminEmail = process.env.ADMIN_EMAIL
const adminPassword = process.env.ADMIN_PASSWORD


const doLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(adminEmail, adminPassword, "pass and email")
        if (email === adminEmail && password === adminPassword) {
            const token = jwt.sign({ userId: adminEmail }, secretKey, { expiresIn: '1h' });
            res.cookie("jwt", token);
            res.json({ status: "exist", token });
        } else if (email !== adminEmail) {
            res.json('Email is not correct');
        } else {
            res.json("Password is incorrect");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// get dashboard

const getDashboard = async (req, res) => {
    try {
        const data = await User.find().lean()
        if (data) {
            res.json(data)
        }
        else {
            res.json("Users are empty")
        }
    }
    catch (error) {
        console.log('get dashboard error', error)
    }
}
// const add user
const addUser = async (req, res) => {
    console.log(req.body,"reqbody adduser")
    const { email, username, phone, password } = req.body;

    try {

        const check = await User.findOne({ email: email })
        if (check) {
            res.json("exist")
        }
        else {
            const newUser = new User({ email, username, phone, password })
            await newUser.save()
            res.json('not-exist')
        }
    }
    catch (error) {
        console.log("adduser route", error)
    }
}
//get edit user

const editUser = async (req, res) => {
console.log("hai")
    const { email } = req.params;

    try {
        const user = await User.findOne({ email:email });
        console.log('user', user)
        if (!user) {
            res.json("user not exist")
        }
        else {
            res.json(user);
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// post edit user
const postEditUser = async (req, res) => {
    try {
        const { email, username, phone, password } = req.body
        const check = await User.findOne({ email: email }).lean()
        if (check) {
            const updatedata = await User.updateMany({ email: email }, { $set: { email: email, phone: phone, username: username, password: password } })
            console.log(updatedata, "update")
            res.json(updatedata)
        }
    }
    catch (error) {
        console.log(error)
    }
}
// deleet user
const deleteUser = async (req, res) => {
    const { email } = req.params;

    try {
        const user = await User.findOne({ email });
        console.log('user', user)
        if (!user) {
            res.json("user not exist")
        }
        else {
            const deletData = await User.deleteOne({ email: email })
            res.json(deletData);
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
const searchUser = async (req, res) => {
    try {
      console.log(req.body);
      const { search } = req.body;
      const data = await User.find({
        $or: [
          { username: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      });
      if (data.length > 0) {
        res.status(200).json({ data, status: 'exist' });
      } else {
        res.status(404).json({ status: 'user not exist' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  



const logoutAdmin = async (req, res) => {
    try {
        res.json('logout')
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = {
    doLogin,
    getDashboard,
    addUser,
    editUser,
    postEditUser,
    deleteUser,
    searchUser,
    logoutAdmin
}