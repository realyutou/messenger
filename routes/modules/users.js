const express = require('express')

const userController = require('../../controllers/user-controller')

const router = express.Router()

// 搜尋使用者
router.get('/search', userController.searchUser)

// 編輯使用者資料表單
router.get('/:account/edit', userController.editUser)

// User profile
router.get('/:account', userController.getUser)

module.exports = router
