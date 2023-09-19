// Include packages and define related variables
const express = require('express')
const { engine } = require('express-handlebars')
const flash = require('connect-flash')
const session = require('express-session')

const routes = require('./routes')

const port = 3000
const app = express()
const sessionSecret = 'secret'

// Set express-handlebars
app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')

// Set body-parser
app.use(express.urlencoded({ extended: true }))

// Set express-session
app.use(session({ secret: sessionSecret, resave: false, saveUninitialized: false }))

// Set connect-flash
app.use(flash())

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  next()
})

// Set routes
app.use(routes)

// Start and listen the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost${port}`)
})
