const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find({})
    .lean()
    .then(restaurants => res.render('index', { restaurants: restaurants.filter(info => info.name.toLowerCase().includes(keyword.toLowerCase()) || info.name_en.toLowerCase().includes(keyword.toLowerCase()) || info.category.includes(keyword)), keyword: keyword }))
    .catch(error => console.log(error))

})

module.exports = router