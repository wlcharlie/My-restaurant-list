const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth')

const home = require('./modules/home')
const detail = require('./modules/detail')
const users = require('./modules/users')
const auth = require('./modules/auth')

router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)
router.use('/restaurants', authenticator, detail)


module.exports = router