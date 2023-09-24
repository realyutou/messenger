const express = require('express')

const directoryController = require('../../controllers/directory-controller')

const router = express.Router()

// 通訊錄頁面
router.get('/', directoryController.getDirectory)

// 新增好友
router.post('/:guestId', directoryController.addFriend)

// 刪除好友
router.delete('/:guestId', directoryController.removeFriend)

module.exports = router
