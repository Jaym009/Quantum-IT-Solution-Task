const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    dateofbirth: {
      type: Date,
      required: true,  
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    }
}, {timestamps: true})

module.exports = mongoose.model("User", UserSchema)