const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require ('../models/userModel')

//Register User
//@desc Register new user
//@route POST /api/users
//access PUBLIC
const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body

    //Check if all fields are filled
    if(!name || !email || !password){
        res.status(400)
        throw new Error ('Please add all fields')
    }

    //Check if the user exists
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error ('Invalid user data')
    }

    res.json({message: 'Register User'})
}
)
//Authenticate/Login a user - Login
//@desc Authenticate a user - Login
//@route POST /api/users/login
//@access PUBLIC
const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body

    //Check for user email
    const user = await User.findOne({email})
    //Compare password passed with the user that just tried to register with his password in the data
    const comparePassword = await bcrypt.compare(password, user.password)

    //Matching the password
    if(user && comparePassword){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else{
        res.status(400)
        throw new Error ('Invalid credentions')        
    }
    res.json({message: 'Login User'})
})

//Display user data
//@desc Get user data
//@route GET  /api/users/me
//@access PRIVATE
const getMe = asyncHandler(async(req, res) => {

    res.status(200).json(req.user)
})

//Generate Token(JWT)
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
  }


module.exports = {registerUser, loginUser, getMe}