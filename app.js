// Include packages and define related variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const { engine } = require('express-handlebars')
const flash = require('connect-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const { Server } = require('socket.io')

const passport = require('./config/passport')
const routes = require('./routes')
const { getUser } = require('./helpers/auth-helper')
const handlebarsHelper = require('./helpers/handlebars-helper')
// const messageHelper = require('./helpers/message-helper')

const port = process.env.PORT || 3000
const app = express()
const server = require('http').createServer(app)
const sessionSecret = 'secret'
const io = new Server(server)

// 將 io 傳入 app 讓後面進入路由、controller時可以用 req.app.io
app.io = io

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
  res.locals.host = getUser(req)
  next()
})

// Set routes
app.use(routes)

// Start and listen the server
server.listen(port, () => {
  console.log(`Express is running on http://localhost${port}`)
})
