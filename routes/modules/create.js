const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')


router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const info = req.body

  let id = Math.floor(Math.random() * 100000 + 1)
  const check_ID = []
  let checking = false

  Restaurant.find({})
    .lean()
    .then(restaurants => restaurants.forEach(a => check_ID.push(a)))
    .then(checking = true)
    .catch(error => console.log(error))

  while (checking) {
    if (check_ID.some(ele => ele === id)) {
      id = Math.floor(Math.random() * 100000 + 1)
    } else {
      checking = false
      if (!info.image) {
        info.image = "https://images.unsplash.com/photo-1619526882897-94e6516aff74"
      }
      if (!info.google_map) {
        info.google_map = `https://www.google.com.tw/maps/search/${info.name}/`
      }
      Restaurant.create({
        id,
        name: info.name,
        name_en: info.name_en,
        category: info.category,
        image: info.image,
        location: info.location,
        phone: info.phone,
        google_map: info.google_map,
        rating: info.rating,
        description: info.description
      })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    }
  }
})

module.exports = router