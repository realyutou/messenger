// Include packages and define related variables
const express = require('express')

const passport = require('../config/passport')
const admin = require('./modules/admin')
const announcements = require('./modules/announcements')
const userController = require('../controllers/user-controller')
const { generalErrorHandler } = require('../middleware/error-handler')
const { authenticatedUser, authenticatedAdmin } = require('../middleware/auth')

const router = express.Router()

router.use('/admin', authenticatedAdmin, admin)
router.use('/announcements', authenticatedUser, announcements)

// 註冊表單頁面
router.get('/signup', userController.signUpPage)

// 送出註冊表單
router.post('/signup', userController.signUp)

// 登入畫面
router.get('/signin', userController.signInPage)

// 送出登入表單
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin' }), userController.signIn)

// 登出功能
router.get('/logout', userController.logout)

// Homepage
router.get('/', authenticatedUser, (req, res) => {
  res.render('main')
})

// 錯誤處理
router.use('/', generalErrorHandler)

// Export modules
module.exports = router
