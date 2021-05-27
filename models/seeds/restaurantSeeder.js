const db = require('../../config/mongoose')

const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results
const User = require('../user')

db.once('open', () => {
  console.log('mongodb connected!')
  console.log('running seeder script...')

  restaurantList.forEach(restaurant => {
    if (restaurant.id < 4) {
      User.findOne({ name: 'user1' })
        .then(user => {
          Restaurant.create({
            id: restaurant.id,
            name: restaurant.name,
            name_en: restaurant.name_en,
            category: restaurant.category,
            image: restaurant.image,
            location: restaurant.location,
            phone: restaurant.phone,
            google_map: restaurant.google_map,
            rating: restaurant.rating,
            description: restaurant.description,
            userId: user._id,
          })
        })
    }
    if (restaurant.id > 5) {
      User.findOne({ name: 'user2' })
        .then(user => {
          Restaurant.create({
            id: restaurant.id,
            name: restaurant.name,
            name_en: restaurant.name_en,
            category: restaurant.category,
            image: restaurant.image,
            location: restaurant.location,
            phone: restaurant.phone,
            google_map: restaurant.google_map,
            rating: restaurant.rating,
            description: restaurant.description,
            userId: user._id,
          })
        })
    }
  })

  setTimeout(() => {
    console.log('closing...')
    process.exit()
  }, 2000);
})