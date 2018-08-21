const _ = require('lodash')
const classRouter = require('express').Router()

// prime with some class data
let classes = [{
  name: 'Charms',
  id: '1'
},
{
  name: 'Care of Magical Creatures',
  id: '2'
},
{
  name: 'Flying',
  id: '3'
},
{
  name: 'Transfiguration',
  id: '4'
},
{
  name: 'Potions',
  id: '5'
},
{
  name: 'Defense Against the Dark Arts',
  id: '6'
}]

// override data to mimic truer behavior for tests
// comment/uncomment as needed
classes = []
let nextid = 100

function getNextId () {
  return nextid++ + '' // increment id and coerce into string for storage
}

//
// ROUTING
//

// This let's me extract the class object first in the middleware stack and attach it
// to the request object so it is easily gotten further down the stack.
classRouter.param('id', (req, res, next, id) => {
  let theClass = _.find(classes, { id: id })
  // make sure we get back a class, then attach it to the request.
  if (theClass) {
    req.theClass = theClass
    next()
  } else {
    res.status('404').send() // use correct 404 http code for resource not found
    // Halts all further middleware from executing if an id is present but it doesn't
    // reference a valid class
  }
})

classRouter.route('/')
  .get((req, res) => {
    res.json(classes)
  })
  .post((req, res) => {
    let theClass = req.body
    theClass.id = getNextId()
    classes.push(theClass)
    res.status('201').json(theClass) // use correct 201 http code for successful creation
  })

classRouter.route('/:id')
  .get((req, res) => {
    let theClass = req.theClass
    res.json(theClass)
  })
  .put((req, res) => {
    let theClass = req.theClass
    let update = req.body

    // have to do this in the case someone tries to update our id...not a legal move
    if (update.id) {
      delete update.id
    }
    _.assign(theClass, update)
    res.json(theClass)
  })
  .delete((req, res) => {
    let theClass = req.theClass
    let classIndex = _.findIndex(classes, theClass)
    classes.splice(classIndex, 1)
    res.json(theClass)
  })

module.exports = classRouter
