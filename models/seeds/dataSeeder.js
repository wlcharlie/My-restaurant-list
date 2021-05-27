const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')

const User = require('../user')

db.once('open', () => {
  console.log('mongodb connected!')
  console.log('running seeder script...')

  const exampleAccount = [
    {
      name: "user1",
      email: "user1@example.com",
      password: "12345678"
    },
    {
      name: "user2",
      email: "user2@example.com",
      password: "12345678"
    }
  ]

  Promise.all(Array.from(
    exampleAccount, each => {
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(each.password, salt))
        .then(hash => User.create({
          name: each.name,
          email: each.email,
          password: hash
        }))
    }
  ))

  setTimeout(() => {
    console.log('closing...')
    process.exit()
  }, 2000);
})