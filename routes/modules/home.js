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
  const target = sorting.split(',')[0] || " "
  const sort = sorting.split(',')[1] || " "

  Restaurant.find({ userId })
    .lean()
    .sort([[target, sort]])
    .then(restaurants => res.render('index', { sorting, restaurants: restaurants.filter(info => info.name.toLowerCase().includes(keyword.toLowerCase()) || info.name_en.toLowerCase().includes(keyword.toLowerCase()) || info.category.includes(keyword)), keyword: keyword }))
    .catch(error => console.log(error))
})

module.exports = router