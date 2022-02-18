const express = require('express')
const { registerUser, loginUser, getMe } = require('../controllers/userController')
const router = express.Router()

//POST - Register user
router.post('/', registerUser)

//POST - Login user / Authenticate user
router.post('/login', loginUser)

//GET - Display user data
router.get('/me', getMe)

module.exports = router