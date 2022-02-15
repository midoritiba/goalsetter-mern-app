const express = require ('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require ('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

//POST REQUEST TO ADD A NEW USER
router.post('/', registerUser)

//POST LOGIN
router.post('/login', loginUser)

//GET DATA USER + authorization protected
router.get('/me', protect, getMe)


module.exports = router