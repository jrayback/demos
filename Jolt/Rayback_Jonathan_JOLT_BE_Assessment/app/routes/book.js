const _ = require('lodash')
const bookRouter = require('express').Router()

// prime with some book data
let books = [{
  name: 'A Beginner\'s Guide to Transfiguration',
  id: '1'
},
{
  name: 'Break with a Banshee',
  id: '2'
},
{
  name: 'Wanderings with Werewolves',
  id: '3'
},
{
  name: 'Magical Drafts and Potions',
  id: '4'
},
{
  name: 'The Standard Book of Spells',
  id: '5'
},
{
  name: 'The Monster Book of Monsters',
  id: '6'
}]

// Overwrite any primed data (simulate fresh instance)
// comment/uncomment as needed
books = []
let nextid = 100

function getNextId () {
  return nextid++ + '' // increment id and coerce into string for storage
}

//
// ROUTING
//

// This let's me extract the book object first in the middleware stack and attach it
// to the request object so it is easily gotten further down the stack.
bookRouter.param('id', (req, res, next, id) => {
  let book = _.find(books, { id: id })
  // make sure we get back a teacher, then attach it to the request.
  if (book) {
    req.book = book
    next()
  } else {
    res.status('404').send() // use correct 404 http code for resource not found
    // Halts all further middleware from executing if an id is present but it doesn't
    // reference a valid teacher
  }
})

bookRouter.route('/')
  .get((req, res) => {
    res.json(books)
  })
  .post((req, res) => {
    let book = req.body
    book.id = getNextId()
    books.push(book)
    res.status('201').json(book) // use correct 201 http code for successful creation
  })

bookRouter.route('/:id')
  .get((req, res) => {
    let book = req.book
    res.json(book)
  })
  .put((req, res) => {
    let book = req.book
    let update = req.body

    // have to do this in the case someone tries to update our id...not a legal move
    if (update.id) {
      delete update.id
    }
    _.assign(book, update)
    res.json(book)
  })
  .delete((req, res) => {
    let book = req.book
    let bookIndex = _.findIndex(books, book)
    books.splice(bookIndex, 1)
    res.json(book)
  })

module.exports = bookRouter
