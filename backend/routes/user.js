const express = require('express')
//controller functions
const {signupUser,loginUser} = require('../controllers/userController')

const router = express.Router()


//login page
router.post('/login',loginUser)

//sign up page
router.post('/signup',signupUser)


module.exports = router