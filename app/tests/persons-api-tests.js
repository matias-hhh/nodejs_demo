process.env.NODE_ENV = process.env.NODE_ENV || 'test';

var app = require('../../server.js'),
  mongoose = require('mongoose'),
  Person = require('../models/person-model'),
  expect = require('chai').expect,
  request = require('supertest');

var person, id;

var personFields = {
    firstName: 'Matti',
    lastName: 'Meikäläinen',
    email: 'matti.meikalainen@gmail.com',
    socialId: '121256-125M',
    dayOfBirth: new Date('1956-12-12')
};

var personFieldsWithErrors = {
    firstName: '',
    lastName: '@',
    email: 'matti.meikalainen@gmail.com',
    socialId: '121256-125M',
    dayOfBirth: new Date('1956-12-12')
};

var createPerson = function () {
  person = new Person(personFields);
};

describe('person-api-tests', function () {
  describe('/api/persons', function () {
    describe('GET', function () {
      before(function (done) {
        createPerson();
        person.save(function (err, person) {
          id = person.id;
          done();
        });
      });
      it('should return 200 and list of persons in the db if any exist', function (done) {
        request(app)
          .get('/api/persons')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect({persons: [{
            __v: 0,
            _id: id,
            dayOfBirth: new Date('1956-12-12').toISOString(),
            email: 'matti.meikalainen@gmail.com',
            firstName: 'Matti',
            lastName: 'Meikäläinen',
            socialId: '121256-125M'
          }]})
          .expect(200, done);
      });
      it('should return 200 and message when no persons in db', function (done) {
        request(app)
          .get('/api/persons')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect({message: 'there are no persons in the database'})
          .expect(200, done);
      });
    });
    describe('POST', function () {
      it('should return 201 and a message, if post-data is correct',
        function (done) {
          request(app)
            .post('/api/persons')
            .send(personFields)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect({message: 'person successfully created'})
            .expect(201, done);
        });
      it('should return 400 and error message if validation errors',
        function (done) {
          request(app)
            .post('/api/persons')
            .send(personFieldsWithErrors)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect({
              message: 'request has erraneous fields',
              errors: {firstName: 'missing_field', lastName: 'invalid'}
            })
            .expect(400, done);
        });
    });
  });
  describe('/api/persons/:personId', function () {
    describe('GET', function () {
      before(function (done) {
        createPerson();
        person.save(function (err, person) {
          id = person.id;
          done();
        });
      });
      it('should return 200 and a person when has existing id', function (done) {
        request(app)
          .get('/api/persons/' + id)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect({
            __v: 0,
            _id: id,
            dayOfBirth: new Date('1956-12-12').toISOString(),
            email: 'matti.meikalainen@gmail.com',
            firstName: 'Matti',
            lastName: 'Meikäläinen',
            socialId: '121256-125M'
          })
          .expect(200, done);
      });
      it('should return 404 when personId is not found in db', function (done) {
        request(app)
          .get('/api/persons/non-existent-id')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(404, done);
      });
    });
    describe('PUT', function () {
      beforeEach(function (done) {
        createPerson();
        person.save(function (err, person) {
          id = person.id;
          done();
        });
      });
      it('should return 200 and a message if person with id exists', function (done) {
        request(app)
          .put('/api/persons/' + id)
          .send(personFields)
          .expect(200)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect({message: 'person successfully updated'}, done);
      });
      it('should return 404 when personId is not found in db', function (done) {
        request(app)
          .put('/api/persons/non-existent-id')
          .send({
              firstName: 'Meikä',
              lastName: 'Mattilainen',
              email: 'matti.meikalainen@gmail.com',
              socialId: '121256-125M',
              dayOfBirth: "[Date: " + new Date('1956-12-12') + "]"
          })
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(404, done);
      });
      it('should return 400 and error message if validation errors in input data',
        function (done) {
          request(app)
            .put('/api/persons/' + id)
            .send(personFieldsWithErrors)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect({
              message: 'request has erraneous fields',
              errors: {firstName: 'missing_field', lastName: 'invalid'}
            })
            .expect(400, done);
        });
    });
  });
  afterEach(function(done) {
    Person.remove(function () {
      done();
    });
  });
});
