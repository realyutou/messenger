// Include packages and define related variables
const express = require('express')

const adminController = require('../../controllers/admin-controller')

const router = express.Router()

// Announcements
router.get('/announcements', adminController.getAnnouncements)

router.get('/', (req, res) => res.redirect('/admin/announcements'))

module.exports = router
