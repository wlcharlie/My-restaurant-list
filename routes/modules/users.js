const express = require('express')
const router = express.Router()

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  User.findOne({ email })
    .then(find => {
      if (!find) {
        req.flash('warningMsg', '電子信箱未被註冊')
        return res.render('login')
      }

      if (password !== find.password) {
        req.flash('warningMsg', '電子信箱或密碼輸入錯誤')
        return res.redirect('/users/login')
      }

      res.redirect('/')
    })
})

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

module.exports = router
