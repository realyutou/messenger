const validator = {
  userprofile: (req, res, next) => {
    try {
      const reservedWord = ['search']
      const { name, email, account, password, passwordCheck, introduction, text, job, location } = req.body
      if (name?.length > 30) throw new Error('請設定 30 字以內的姓名！')
      if (email?.length > 50) throw new Error('請輸入正確的電子信箱！')
      if (password !== passwordCheck) throw new Error('密碼與確認密碼不符合！')
      if (password) {
        if (password.length < 5 || password.length > 20) throw new Error('請設定 5 ~ 20 字的密碼！')
      }
      if (account) {
        if (reservedWord.includes(account)) throw new Error('無法使用該帳號！')
        if (account.length > 20) throw new Error('請設定 20 字以內的帳號！')
      }
      if (introduction?.length > 200) throw new Error('請設定 200 字以內的自我介紹！')
      if (text?.length > 100) throw new Error('請設定 100 字以內的動態消息！')
      if (job?.length > 50) throw new Error('職業名稱長度限定 50 字以內！')
      if (location?.length > 50) throw new Error('現居地長度限定 50 字以內！')
      next()
    } catch (err) {
      return next(err)
    }
  }
}

module.exports = validator
