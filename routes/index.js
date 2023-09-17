// Include packages and define related variables
const express = require('express')

const router = express.Router()

// Homepage
router.get('/', (req, res) => {
  res.send('Hello world!')
})

// Export modules
module.exports = router
