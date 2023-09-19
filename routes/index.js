// Include packages and define related variables
const express = require('express')

const userController = require('../controllers/user-controller')
const { generalErrorHandler } = require('../middleware/error-handler')

const router = express.Router()

// Signup
router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)

// Signin page
router.get('/signin', userController.signInPage)

// Homepage
router.get('/', (req, res) => {
  res.send('Hello world!')
})

router.use('/', generalErrorHandler)

// Export modules
module.exports = router
