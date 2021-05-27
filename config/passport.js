const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcryptjs')

const User = require('../models/user')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  // localStrategy為user+password，用參數將user用email取代
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
  }, (req, email, password, done) => {
    User.findOne({ email })
      .then(find => {
        if (!find) {
          return done(null, false, { message: '電子信箱尚未註冊!' })
        }
        // 用bcrypt裡的比對方法(使用者輸入 比對 雜湊密碼)
        return bcrypt.compare(password, find.password)
          .then(match => {
            if (!match) {
              return done(null, false, { message: '電子信箱或密碼輸入錯誤!' })
            }
            return done(null, find)
          })
          .catch(err => done(err, false))
      })
  }))

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    // 要抓取使用者的資料，name似乎已經有了
    profileFields: ['displayName', 'email']
  },
    function (accessToken, refreshToken, profile, done) {
      const { name, email } = profile._json
      User.findOne({ email })
        .then(user => {
          if (user) {
            return done(null, user)
          }

          const randomPassword = Math.random().toString(36).slice(-5)
          return bcrypt
            .genSalt(8)
            .then(salt => bcrypt.hash(randomPassword, salt))
            .then(hash => User.create({
              name,
              email,
              password: hash
            }))
            .then(user => done(null, user))
            .catch(err => done(err, false))
        })
    }
  ))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}