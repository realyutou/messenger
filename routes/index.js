// Include packages and define related variables
const express = require('express')

const passport = require('../config/passport')
const userController = require('../controllers/user-controller')
const { generalErrorHandler } = require('../middleware/error-handler')

const router = express.Router()

// Signup
router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)

// Signin
router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin' }), userController.signIn)
router.get('/logout', userController.logout)

// Homepage
router.get('/', (req, res) => {
  res.render('main')
})

router.use('/', generalErrorHandler)

// Export modules
module.exports = router
