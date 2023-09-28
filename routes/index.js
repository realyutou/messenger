// Include packages and define related variables
const express = require('express')

const passport = require('../config/passport')
const admin = require('./modules/admin')
const announcements = require('./modules/announcements')
const users = require('./modules/users')
const directories = require('./modules/directories')
const chat = require('./modules/chatroom')
const userController = require('../controllers/user-controller')
const { generalErrorHandler } = require('../middleware/error-handler')
const { authenticatedUser, authenticatedAdmin } = require('../middleware/auth')
const validator = require('../middleware/validator')

const router = express.Router()

router.use('/admin', authenticatedAdmin, admin)
router.use('/announcements', authenticatedUser, announcements)
router.use('/users', authenticatedUser, users)
router.use('/directories', authenticatedUser, directories)
router.use('/chatroom', authenticatedUser, chat)

// 註冊表單頁面
router.get('/signup', userController.signUpPage)

// 送出註冊表單
router.post('/signup', validator.userprofile, userController.signUp)

// 登入畫面
router.get('/signin', userController.signInPage)

// 登入功能
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin' }), userController.signIn)

// 登出功能
router.get('/logout', userController.logout)

// Homepage
router.get('/', authenticatedUser, (req, res) => { res.redirect('/directories') })

// 錯誤處理
router.use('/', generalErrorHandler)

// Export modules
module.exports = router
