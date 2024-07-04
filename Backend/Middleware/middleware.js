const express = require('express');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../Auth/Jwtkey');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
const verifyJWT = (req, res, next) => {
    const token = req.header('Authorization');
    console.log(token, "token");
    if (!token) {
        res.send("We need a token, please give it to us next time");
    } else {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                console.log(err);
                res.json({ auth: false, message: "Failed to authenticate" });
            } else {
                req.userId = decoded.userId; // Ensure `userId` matches the key used in `sign()`
                next();
            }
        });
    }
};
const verifyUser = (req, res, next) => {
    const token = req.header('Authorization');
    console.log(token, "token");
    if (!token) {
        res.send("We need a token, please give it to us next time");
    } else {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                console.log(err);
                res.json({ auth: false, message: "Failed to authenticate" });
            } else {
                req.userId = decoded.userId; // Ensure `userId` matches the key used in `sign()`
                next();
                
            }
        });
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

  
module.exports = {
    verifyJWT,
    verifyUser,
    upload
}


