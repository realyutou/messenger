// Include packages and define related variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const { engine } = require('express-handlebars')
const flash = require('connect-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const passport = require('./config/passport')
const routes = require('./routes')
const { getUser } = require('./helpers/auth-helper')
const handlebarsHelper = require('./helpers/handlebars-helper')

const port = process.env.PORT || 3000
const app = express()
const sessionSecret = 'secret'

// Set express-handlebars
app.engine('.hbs', engine({ extname: '.hbs', helpers: handlebarsHelper }))
app.set('view engine', '.hbs')
app.set('views', './views')

// Set body-parser
app.use(express.urlencoded({ extended: true }))

// Set method-override
app.use(methodOverride('_method'))

// Set express-session
app.use(session({ secret: sessionSecret, resave: false, saveUninitialized: false }))

// Set passport
app.use(passport.initialize())
app.use(passport.session())

// Set connect-flash
app.use(flash())

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.user = getUser(req)
  next()
})

// Set routes
app.use(routes)

// Start and listen the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost${port}`)
})
