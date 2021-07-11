const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

router.get('/search', (req, res) => {
  const userId = req.user._id
  const keyword = req.query.keyword
  const sorting = req.query.sorting
  const target = sorting.split(',')[0] || ' '
  const sort = sorting.split(',')[1] || ' '

  const options = { $regex: keyword, $options: 'ix' }

  Restaurant.find({ userId, $or: [{ name: options }, { name_en: options }, { category: options }] })
    .lean()
    .sort([[target, sort]])
    .then(restaurants => {
      res.render('index', { sorting, restaurants, keyword })
    })
    .catch(error => console.log(error))
})

module.exports = router
