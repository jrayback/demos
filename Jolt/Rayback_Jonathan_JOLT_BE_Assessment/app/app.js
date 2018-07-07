const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const db = require('./db')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('teachers', require('./controllers/teachers'))
app.use('classes', require('./controllers/classes'))
app.use('books', require('./controllers/books'))
app.use('students', require('./controllers/students'))

const port = process.env.PORT || 8080

const router = express.Router()

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', (req, res) => {
  res.json({ message: 'Hello Harry, welcome to your API!' })
})

// more routes for our API will happen here

// all of our routes will be prefixed with /api
app.use('/api', router)

// Make DB connection and start the service
// GETTING STUCK HERE. CAN'T MAKE THE DB CONNECTION. CAN'T CONNECT TO THE
// CONTAINERIZED DB FROM MY LOCAL ENVIRO...I NEED TO SET UP A LOCAL DB, TROUBLESHOOT
// AND THEN COME BACK TO FIGURE OUT THE CONNECTION PROBLEM IN DOCKER...
db.connect((err) => {
  if (err) {
    console.log('Unable to connect to MySQL.')
    process.exit(1)
  } else {
    app.listen(port)
    console.log('Listening on port ' + port)
  }
})
