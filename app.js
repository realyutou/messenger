// Include packages and define related variables
const express = require('express')

const routes = require('./routes')

const port = 3000
const app = express()

// Set routes
app.use(routes)

// Start and listen the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost${port}`)
})
