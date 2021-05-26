const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const detail = require('./modules/detail')
const users = require('./modules/users')

router.use('/', home)
router.use('/restaurants', detail)
router.use('/users', users)

module.exports = router