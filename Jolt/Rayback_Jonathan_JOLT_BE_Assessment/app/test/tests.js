/* eslint-env mocha */
const app = require('../app')
const request = require('supertest')
const expect = require('chai').expect

// just testing the plumbing
describe('[Baseline Test]', () => {
  it('True should equal true', () => {
    expect(true).to.equal(true)
  })
})

//
// TEACHERS TESTS
//
describe('[Teachers]', () => {
  it('Should get all teachers', (done) => {
    request(app)
      .get('/api/teachers')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, resp) => {
        if (err) return done(err)
        expect(resp.body).to.be.an('array')
        done()
      })
  })

  // This really only works because I'm seeding data.
  // Take out the seed data and make the tests pass then.
  // So post something first then get it?
  // Does this whole test structure maintain state across all tests?
  // Will I get weird behavior if I move the tests around because I can't control the id, e.g.
  it('Should get the correct single teacher', (done) => {
    let id = '1'
    request(app)
      .get('/api/teachers/' + id)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, resp) => {
        if (err) return done(err)
        expect(resp.body.id).to.equal(id)
        done()
      })
  })
})
