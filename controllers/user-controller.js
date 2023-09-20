const userService = require('../services/user-service')

const userController = {
  signUpPage: (req, res) => {
    res.render('signup')
  },
  signUp: (req, res, next) => {
    userService.signUp(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_msg', '註冊成功，請登入！')
      return res.redirect('/signin')
    })
  },
  signInPage: (req, res) => {
    res.render('signin')
  },
  signIn: (req, res) => {
    req.flash('success_msg', '登入成功！')
    res.redirect('/')
  },
  logout: (req, res, next) => {
    req.flash('success_msg', '登出成功！')
    req.logout((err) => {
      if (err) return next(err)
    })
    res.redirect('/signin')
  }
}

module.exports = userController
