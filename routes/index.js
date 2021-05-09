const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const detail = require('./modules/detail')

router.use('/', home)
router.use('/restaurants', detail)


module.exports = router