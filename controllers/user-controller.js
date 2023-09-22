const userService = require('../services/user-service')
const { getUser } = require('../helpers/auth-helper')

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
  logout: (req, res) => {
    req.logout(() => {
      req.flash('success_msg', '登出成功！')
      return res.redirect('/signin')
    })
  },
  getUser: (req, res, next) => {
    userService.getUser(req, (err, data) => {
      err ? next(err) : res.render('user', { user: data.user, hostAccount: data.hostAccount })
    })
  },
  searchUser: (req, res) => {
    const hostAccount = getUser(req).account
    const { keyword } = req.query
    keyword ? res.redirect(`/users/${keyword}`) : res.render('search-user', { hostAccount })
  }
}

module.exports = userController
