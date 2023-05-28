const mongoose = require('mongoose');
const validator = require('validator');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name!'],
        maxlength: [40, 'Name should be under 40 characters!']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email!'],
        validate: [validator.isEmail, 'Please enter email in correct format!'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password!'],
        minlength: [6, 'Password should be atleast 6 char!'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model("User", userSchema);
module.exports = User;