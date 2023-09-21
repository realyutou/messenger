// Include packages and define related variables
const express = require('express')

const adminController = require('../../controllers/admin-controller')

const router = express.Router()

// 新增公告表單頁面
router.get('/announcements/new', adminController.newAnnouncement)

// 新增公告
router.post('/announcements', adminController.postAnnouncement)

// 編輯公告表單頁面
router.get('/announcements/:id/edit', adminController.editAnnouncement)

// 編輯特定公告
router.put('/announcements/:id', adminController.putAnnouncement)

// 刪除特定公告
router.delete('/announcements/:id', adminController.deleteAnnouncement)

// 瀏覽所有公告頁面
router.get('/announcements', adminController.getAnnouncements)

// 瀏覽所有使用者頁面
router.get('/users', adminController.getUsers)

// 更改特定使用者權限
router.patch('/users/:account', adminController.patchUser)

router.get('/', (req, res) => res.redirect('/admin/announcements'))

module.exports = router
