const express = require('express')
const router = express.Router()
const passport = require('passport')

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  if (!(name && email && password && confirmPassword)) {
    errors.push({ message: '請填寫所有欄位' })
  } else if (password !== confirmPassword) {
    errors.push({ message: '密碼與再次輸入不同' })
  }

  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: 'Email已被註冊' })
        return res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      }
    })

  //填寫內容皆無誤，則建立新的使用者，回傳到登入頁
  User.create({
    name,
    email,
    password
  })
    .then(() => res.redirect('/users/login'))
    .catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('successMsg', '登出成功')
  res.redirect('/users/login')
})

module.exports = router
