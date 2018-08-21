const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const morgan = require('morgan')

// mount the routes
const teacherRouter = require('./routes/teacher')
const classRouter = require('./routes/class')
const bookRouter = require('./routes/book')

// const db = require('./db')

app.use(morgan('tiny'))
// static assets go in this public directory
// handles static html pages for '/' and '/api/'
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/teachers/', teacherRouter)
app.use('/api/classes/', classRouter)
app.use('/api/books/', bookRouter)

// this error handler should be last so that it can catch any errors thrown before it
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send(err)
  }
})

module.exports = app

/* app.use('teachers', require('./controllers/teachers'))
app.use('classes', require('./controllers/classes'))
app.use('books', require('./controllers/books'))
app.use('students', require('./controllers/students')) */

// Make DB connection and start the service
// GETTING STUCK HERE. CAN'T MAKE THE DB CONNECTION. CAN'T CONNECT TO THE
// CONTAINERIZED DB FROM MY LOCAL ENVIRO...I NEED TO SET UP A LOCAL DB, TROUBLESHOOT
// AND THEN COME BACK TO FIGURE OUT THE CONNECTION PROBLEM IN DOCKER...
/* db.connect((err) => {
  if (err) {
    console.log('Unable to connect to MySQL.')
    process.exit(1)
  } else {
    app.listen(port)
    console.log('Listening on port ' + port)
  }
}) */
