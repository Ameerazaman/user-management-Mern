const mongoose = require('mongoose')
const signupSchema = new mongoose.Schema({
    email: {
        type: String
    },
    username: {
        type: String
    },
    phone: {
        type: Number
    },
    password: {

        type: String
    },
    profilepicture: {
        type: String
    }

})

const User = mongoose.model('collection', signupSchema)
module.exports = User