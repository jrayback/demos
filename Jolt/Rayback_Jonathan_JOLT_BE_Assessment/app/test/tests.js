/* eslint-env mocha */
const app = require('../app')
const request = require('supertest')
const expect = require('chai').expect

const getTeacher = () => ({firstname: 'Filius', lastname: 'Flitwick'})
const getClass = () => ({name: 'Care of Magical Creatures'})
const getBook = () => ({name: 'Break with a Banshee'})

function testGet (endpoint, done) {
  request(app)
    .get(endpoint)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, resp) {
      if (err) return done(err)
      // will be an empty array
      console.log(resp.body)
      expect(resp.body).to.be.an('array')
      done()
    })
}

describe('[GET tests]', function () {
  // TODO Add students
  const tests = [
    {label: 'teachers', endpoint: '/api/teachers/'},
    {label: 'classes', endpoint: '/api/classes/'},
    {label: 'books', endpoint: '/api/books/'}
  ]
  tests.forEach(function (test) {
    it(`Should get an array of all ${test.label}`, function (done) {
      testGet(test.endpoint, done)
    })
  })
})

function testGetSingle (endpoint, getSample, done) {
  // Create an object to post and get
  let sampleObject = getSample()
  request(app)
    .post(endpoint)
    .send(sampleObject)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201)
    .end(function (err, resp) {
      if (err) return done(err)
      console.log(resp.body)
      expect(resp.body).to.be.an('object')
      sampleObject.id = resp.body.id
      request(app)
        // request by id the object we just posted
        .get(endpoint + sampleObject.id)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, resp) {
          if (err) return done(err)
          console.log(resp.body)
          expect(resp.body).to.be.an('object')
          expect(resp.body).to.deep.equal(sampleObject)
          done()
        })
    })
}

describe('[GET ONE tests]', function () {
  // TODO Add students
  const tests = [
    {label: 'teacher', endpoint: '/api/teachers/', getSample: getTeacher},
    {label: 'class', endpoint: '/api/classes/', getSample: getClass},
    {label: 'book', endpoint: '/api/books/', getSample: getBook}
  ]
  tests.forEach(function (test) {
    it(`Should get a single ${test.label} by id`, function (done) {
      testGetSingle(test.endpoint, test.getSample, done)
    })
  })
})

function testPost (endpoint, getSample, done) {
  let sampleObject = getSample()
  request(app)
    .post(endpoint)
    .send(sampleObject)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201)
    .end(function (err, resp) {
      if (err) return done(err)
      console.log(resp.body)
      expect(resp.body).to.be.an('object')
      sampleObject.id = resp.body.id
      expect(resp.body).to.deep.equal(sampleObject)
      done()
    })
}

describe('[POST tests]', function () {
  // TODO Add books and students
  const tests = [
    {label: 'teacher', endpoint: '/api/teachers/', getSample: getTeacher},
    {label: 'class', endpoint: '/api/classes/', getSample: getClass},
    {label: 'book', endpoint: '/api/books/', getSample: getBook}
  ]
  tests.forEach(function (test) {
    it(`Should create a ${test.label}`, function (done) {
      testPost(test.endpoint, test.getSample, done)
    })
  })
})

function putTests (endpoint, getSample, updateField, updateValue, done) {
  // create a class to update
  let sampleObject = getSample()
  request(app)
    .post(endpoint)
    .send(sampleObject)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201)
    .end(function (err, resp) {
      if (err) return done(err)
      console.log(resp.body)
      expect(resp.body).to.be.an('object')
      sampleObject.id = resp.body.id
      // update the name in the class object we'll send
      sampleObject[updateField] = updateValue
      request(app)
        .put(endpoint + sampleObject.id)
        .send(sampleObject)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, resp) {
          if (err) return done(err)
          console.log(resp.body)
          expect(resp.body).to.be.an('object')
          expect(resp.body).to.deep.equal(sampleObject)
          // just be certain the field has been updated with the new name
          expect(resp.body[updateField]).to.equal(updateValue)
          done()
        })
    })
}

describe('[PUT tests]', function () {
  // TODO Add books and students
  const tests = [
    {
      label: 'teacher',
      endpoint: '/api/teachers/',
      getSample: getTeacher,
      updateField: 'firstname',
      updateValue: 'Bruce'
    },
    {
      label: 'class',
      endpoint: '/api/classes/',
      getSample: getClass,
      updateField: 'name',
      updateValue: 'Tomfoolery with Nunchucks and Donuts'
    }
  ]
  tests.forEach(function (test) {
    it(`Should update a ${test.label}`, function (done) {
      putTests(test.endpoint, test.getSample, test.updateField, test.updateValue, done)
    })
  })
})

function deleteTests (endpoint, getSample, done) {
  // create a class to delete
  let sampleObject = getSample()
  request(app)
    .post(endpoint)
    .send(sampleObject)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201)
    .end(function (err, resp) {
      if (err) return done(err)
      console.log(resp.body)
      expect(resp.body).to.be.an('object')
      sampleObject.id = resp.body.id
      request(app)
        // delete the class just created using the id
        .delete(endpoint + sampleObject.id)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, resp) {
          if (err) return done(err)
          console.log(resp.body)
          // the request should return the successfully deleted class
          expect(resp.body).to.be.an('object')
          expect(resp.body).to.deep.equal(sampleObject)
          request(app)
            // verify that the class was deleted by trying to get it by id,
            // should get 'resource not found'
            .get(endpoint + sampleObject.id)
            .set('Accept', 'application/json')
            .expect(404)
            .end(function (err, resp) {
              if (err) return done(err)
              done()
            })
        })
    })
}

describe('[DELETE tests]', function () {
  // TODO Add books and students
  const tests = [
    {label: 'teacher', endpoint: '/api/teachers/', getSample: getTeacher},
    {label: 'class', endpoint: '/api/classes/', getSample: getClass}
  ]
  tests.forEach(function (test) {
    it(`Should delete a ${test.label}`, function (done) {
      deleteTests(test.endpoint, test.getSample, done)
    })
  })
})
