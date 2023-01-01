const db = require('../../config/mongoose')
const login_schema = require('../login_schema')
const users = [
  {
    firstName: 'Tony',
    email: 'tony@stark.com',
    password: 'iamironman',
  },
  {
    firstName: 'Steve',
    email: 'captain@hotmail.com',
    password: 'icandothisallday',
  },
  {
    firstName: 'Peter',
    email: 'peter@parker.com',
    password: 'enajyram',
  },
  {
    firstName: 'Natasha',
    email: 'natasha@gamil.com',
    password: '*parol#@$!',
  },
  {
    firstName: 'Nick',
    email: 'nick@shield.com',
    password: 'password',
  },
]

db.once('open', () => {
  users.forEach(user => {
    login_schema.create({
      firstName: user.firstName,
      email: user.email,
      password: user.password,
    })
  })
  console.log('Import data to DB. Done.')
})
