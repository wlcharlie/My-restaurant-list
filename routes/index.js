const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const detail = require('./modules/detail')
const create = require('./modules/create')
const save = require('./modules/save')

router.use('/', home)
router.use('/restaurants', detail)
router.use('/create', create)
router.use('/save', save)

module.exports = router