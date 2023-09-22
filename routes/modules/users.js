const express = require('express')

const userController = require('../../controllers/user-controller')

const router = express.Router()

router.get('/:account', userController.getUser)

module.exports = router
