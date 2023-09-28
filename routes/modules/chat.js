const express = require('express')

const chatController = require('../../controllers/chat-controller')

const router = express.Router()

router.get('/', chatController.getChatroom)

module.exports = router
