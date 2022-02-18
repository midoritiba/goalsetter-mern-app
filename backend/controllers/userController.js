const asyncHandler = require('express-async-handler')
const User = require ('../models/userModel')

//Register User
//@desc Register new user
//@route POST /api/users
//access PUBLIC
const registerUser = (req, res) => {
    res.json({message: 'Register User'})
}

//Authenticate a user - Login
//@desc Authenticate a user - Login
//@route POST /api/users/login
//@access PUBLIC
const loginUser = (req, res) => {
    res.json({message: 'Login User'})
}

//Display user data
//@desc Get user data
//@route GET  /api/users/me
//@access PUBLIC
const getMe = (req, res) => {
    res.json({message: 'User Data Display'})
}

module.exports = {registerUser, loginUser, getMe}