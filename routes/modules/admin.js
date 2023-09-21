// Include packages and define related variables
const express = require('express')

const adminController = require('../../controllers/admin-controller')

const router = express.Router()

// Announcements
router.get('/announcements/new', adminController.newAnnouncement)
router.post('/announcements', adminController.postAnnouncement)
router.get('/announcements/:id/edit', adminController.editAnnouncement)
router.put('/announcements/:id', adminController.putAnnouncement)
router.delete('/announcements/:id', adminController.deleteAnnouncement)
router.get('/announcements', adminController.getAnnouncements)

// Users
router.get('/users', adminController.getUsers)
router.patch('/users/:account', adminController.patchUser)

router.get('/', (req, res) => res.redirect('/admin/announcements'))

module.exports = router
