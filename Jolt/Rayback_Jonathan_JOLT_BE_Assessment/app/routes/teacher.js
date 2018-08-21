const _ = require('lodash')
const teacherRouter = require('express').Router()

// prime with some teacher data
let teachers = [{
  firstname: 'Filius',
  lastname: 'Flitwick',
  id: '1'
},
{
  firstname: 'Rubeus',
  lastname: 'Hagrid',
  id: '2'
},
{
  firstname: 'Rolanda',
  lastname: 'Hooch',
  id: '3'
},
{
  firstname: 'Minerva',
  lastname: 'McGonagall',
  id: '4'
},
{
  firstname: 'Severus',
  lastname: 'Snape',
  id: '5'
},
{
  firstname: 'Gilderoy',
  lastname: 'Lockhart',
  id: '6'
}]

// Overwrite any primed data (simulate fresh instance)
// comment/uncomment as needed
teachers = []
let nextid = 100

function getNextId () {
  return nextid++ + '' // increment id and coerce into string for storage
}

//
// ROUTING
//

// This let's me extract the teacher object first in the middleware stack and attach it
// to the request object so it is easily gotten further down the stack.
teacherRouter.param('id', (req, res, next, id) => {
  let teacher = _.find(teachers, { id: id })
  // make sure we get back a teacher, then attach it to the request.
  if (teacher) {
    req.teacher = teacher
    next()
  } else {
    res.status('404').send() // use correct 404 http code for resource not found
    // Halts all further middleware from executing if an id is present but it doesn't
    // reference a valid teacher
  }
})

teacherRouter.route('/')
  .get((req, res) => {
    res.json(teachers)
  })
  .post((req, res) => {
    let teacher = req.body
    teacher.id = getNextId()
    teachers.push(teacher)
    res.status('201').json(teacher) // use correct 201 http code for successful creation
  })

teacherRouter.route('/:id')
  .get((req, res) => {
    let teacher = req.teacher
    res.json(teacher)
  })
  .put((req, res) => {
    let teacher = req.teacher
    let update = req.body

    // have to do this in the case someone tries to update our id...not a legal move
    if (update.id) {
      delete update.id
    }
    _.assign(teacher, update)
    res.json(teacher)
  })
  .delete((req, res) => {
    let teacher = req.teacher
    let teacherIndex = _.findIndex(teachers, teacher)
    teachers.splice(teacherIndex, 1)
    res.json(teacher)
  })

module.exports = teacherRouter
