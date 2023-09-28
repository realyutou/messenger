const express = require('express')

const messageController = require('../../controllers/message-controller')

const router = express.Router()

router.get('/', messageController.getPublic)

module.exports = router
