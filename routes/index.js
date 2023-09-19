// Include packages and define related variables
const express = require('express')

const userController = require('../controllers/user-controller')

const router = express.Router()

// Signup page
router.get('/signup', userController.signUpPage)

// Signin page
router.get('/signin', userController.signInPage)

// Homepage
router.get('/', (req, res) => {
  res.send('Hello world!')
})

// Export modules
module.exports = router
