const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash')
const morgan = require('morgan')
// really want these next two as part of a testing strategy, but in  prod for now
const randomWord = require('random-word')
const randomName = require('node-random-name')

const app = express()

// this is completely extraneous...just to demonstrate the concept of Express middleware
app.use((req, res, next) => {
  console.log('First middleware...')
  next()
})

// built-in functionality to serve static assets from indicated dir
// also assumes an index.html files exists and serves when root is requested
app.use(express.static('.'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// TODO: Futz around with this to make this work...see video
app.use(morgan('tiny'))

const port = 3002

// reference lion schema
// let simba = {
//   'name': 'Simba',
//   'id': '1',
//   'age': '3',
//   'pride': 'the cool cats',
//   'gender': 'male'
// }

let nextid = 1

function getNextId () {
  return nextid++ + '' // increment id and coerce into string for storage
}

// use this function to load up some initial randomized data each time
// should really be part of some test strategy instead of the main logic
const makeALion = () => {
  let lion = {
    'name': randomName({ random: Math.random, first: true, gender: 'female' }),
    'id': getNextId(),
    'age': Math.round(Math.random() * 15) + 1,
    'pride': `${randomWord()} ${randomWord()}`,
    'gender': 'female'
  }
  console.log(lion)
  return lion
}

// we'll store in an array for now
let lions = []
// lions.push(simba) // store reference lion as first lion
lions = _.times(5, makeALion)

//
// ROUTING
//

// This let's me extract the lion object first in the middleware stack and attach it
// to the request object so it is easily gotten further down the stack.
app.param('id', (req, res, next, id) => {
  let lion = _.find(lions, { id: id })
  // make sure we get back a lion, then attach it to the request.
  if (lion) {
    req.lion = lion
    next()
  } else {
    res.status('404').send() // use correct 404 http code for resource not found
    // Halts all further middleware from executing if an id is present but it doesn't
    // reference a valid lion
  }
})

app.get('/lions', (req, res) => {
  res.json(lions)
})

app.get('/lions/:id', (req, res) => {
  let lion = req.lion
  res.json(lion)
})

app.post('/lions', (req, res) => {
  let lion = req.body
  lion.id = getNextId()
  lions.push(lion)
  res.status('201').json(lion) // use correct 201 http code for successful creation
})

app.put('/lions/:id', (req, res) => {
  let lion = req.lion
  let update = req.body

  // have to do this in the case someone tries to update our id...not a legal move
  if (update.id) {
    delete update.id
  }

  _.assign(lion, update)
  res.json(lion)
})

app.delete('/lions/:id', (req, res) => {
  let lion = req.lion
  let lionIndex = _.findIndex(lions, lion)
  lions.splice(lionIndex, 1)
  res.json(lion)
})

// this error handler should be last so that it can catch any errors thrown before it
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send(err)
  }
})

// start server
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`)
})
