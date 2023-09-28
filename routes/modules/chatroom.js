const express = require('express')

const messageController = require('../../controllers/message-controller')

const router = express.Router()

// Private chatroom
router.get('/:guestId', messageController.getChatroom)

// Public chatroom
router.get('/', messageController.getChatroom)

module.exports = router
