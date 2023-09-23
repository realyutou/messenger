const express = require('express')

const userController = require('../../controllers/user-controller')
const upload = require('../../middleware/multer')
const validator = require('../../middleware/validator')

const router = express.Router()

// 搜尋使用者
router.get('/search', userController.searchUser)

// 編輯使用者資料表單
router.get('/:account/edit', userController.editUser)

// 編輯使用者資料
router.put('/:account', upload.single('avatar'), validator.userprofile, userController.putUser)

// User profile
router.get('/:account', userController.getUser)

module.exports = router
