const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.post('/:id', (req, res) => {
  const id = Number(req.params.id)
  const info = req.body


  if (!info.image) {
    info.image = "https://images.unsplash.com/photo-1619526882897-94e6516aff74"
  }
  if (!info.google_map) {
    info.google_map = `https://www.google.com.tw/maps/search/${info.name}/`
  }

  Restaurant.findOneAndUpdate({ id }, {
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
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

module.exports = router