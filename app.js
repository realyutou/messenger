// Include packages and define related variables
const express = require('express')
const { engine } = require('express-handlebars')

const routes = require('./routes')

const port = 3000
const app = express()

// Set express-handlebars
app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')

// Set body-parser
app.use(express.urlencoded({ extended: true }))

// Set routes
app.use(routes)

// Start and listen the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost${port}`)
})
