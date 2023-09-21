const express = require('express')

const announcementController = require('../../controllers/announcement-controller')

const router = express.Router()

// 查看所有公告
router.get('/', announcementController.getAnnouncements)

module.exports = router
