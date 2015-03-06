process.env.NODE_ENV = process.env.NODE_ENV || 'test';

var mongoose = require('../../config/mongoose'),
  Person = require('../models/person-model'),
  expect = require('chai').expect,
  db = mongoose();

var person, anotherPerson;

describe('person-model-tests:', function () { 
  beforeEach(function () {
    person = new Person({
      firstName:'Matti',
      lastName: 'Meikäläinen',
      email: 'matti.meikalainen@gmail.com',
      socialId: '121256-7890',
      dayOfBirth: new Date('1956-12-12')
    });
  });
  describe('save validation:', function () {
    it('should save when no errors in input data', function () {
      person.save(function (err) {
        console.log(err);
        expect(err).to.not.exist;
      });
    });
    describe('firstName', function () {
      it('should give "missing-field"-error when no firstName', function () {
        person.firstName = '';
        person.save(function (err) {
          expect(err.errors.firstName.message).to.equal('missing_field');
        });
      });
      it('should give "invalid"-error with special charatcers in firstName',
        function () {
          person.firstName = 'M@tti';
          person.save(function (err) {
            expect(err.errors.firstName.message).to.equal('invalid');
          });
      });
    });
      describe('lastName', function () {
      it('should give "missing-field"-error when no lastName', function () {
        person.lastName = '';
        person.save(function (err) {
          expect(err.errors.lastName.message).to.equal('missing_field');
        });
      });
      it('should not save with special charatcers in lastName', function () {
        person.lastName = 'M€ikäläinen';
        person.save(function (err) {
          expect(err.errors.lastName.message).to.equal('invalid');
        });
      });
    });
    describe('email', function () {
      it('should give "missing-field"-error when no email', function () {
        person.email = '';
        person.save(function (err) {
          expect(err.errors.email.message).to.equal('missing_field');
        });
      });
      it('should give "invalid"-error when email has no @-character ', function () {
        person.email = 'matti.meikalainen.gmail.com';
        person.save(function (err) {
          expect(err.errors.email.message).to.equal('invalid');
        });
      });
      it('should give "invalid"-error when email has no characters before @-character ',
        function () {
          person.email = '@gmail.com';
          person.save(function (err) {
            expect(err.errors.email.message).to.equal('invalid');
          });
      });
      it('should give "invalid"-error when email has no characters after @-character ',
        function () {
          person.email = 'matti.meikalainen@';
          person.save(function (err) {
            expect(err.errors.email.message).to.equal('invalid');
          });
      });
    });
    describe('dayOfBirth', function () {
      it('should give "missing"-error when no dayOfBirth', function () {
        person.dayOfBirth = '';
        person.save(function (err) {
          expect(err.errors.dayOfBirth.message).to.equal('missing_field');
        });
      });
      it('shouldgive "invalid"-error when dayOfBirth is not a Date object',
        function () {
          person.dayOfBirth = 'This is not a date';
          person.save(function (err) {
            expect(err.name).to.equal('CastError');
          });
      });
      it('should give "date_in_future"-error when dayOfBirth is in the future',
        function () {
          person.dayOfBirth =  new Date('2016-08-08');
          person.save(function (err) {
            expect(err.errors.dayOfBirth.message).to.equal('date_in_future');
          });
      });
      it('should save when dayOfBirth is a valid Date', function () {
        person.dayOfBirth = new Date('1956-12-12');
        person.save(function (err) {
          expect(err).to.not.exist;
        });
      });
    });
    describe('socialId', function () {
      it('should not save when no socialId', function () {
        person.socialId = '';
        person.save(function (err) {
          expect(err.errors.socialId.message).to.equal('missing_field');
        });
      });
      it('should give "invalid"-error when socialId has no century id',
        function () {
          person.socialId = '1212567890';
          person.save(function (err) {
            expect(err.errors.socialId.message).to.equal('invalid');
          });
      });
      it('should give "invalid"-error when socialId has centurt id in wrong ' +
        'place',function () {
          person.socialId = '12125-67890';
          person.save(function (err) {
            expect(err.errors.socialId.message).to.equal('invalid');
          });
      });
      it('should give "invalid"-error when socialId has letters in wrong ' +
        'place', function () {
          person.socialId = '121A56-7890';
          person.save(function (err) {
            expect(err.errors.socialId.message).to.equal('invalid');
          });
      });
      it('should give "invalid"-error when socialId does not have enough ' +
        'characters after dash', function () {
          person.socialId = '121256-789';
          person.save(function (err) {
            expect(err.errors.socialId.message).to.equal('invalid');
          });
        });
      it('should give "invalid"-error when socialId does not have enough ' +
        'characters before dash', function () {
          person.socialId = '12125-7890';
          person.save(function (err) {
            expect(err.errors.socialId.message).to.equal('invalid');
          });
        });
      it('should give "date_does_not_match"-error when socialId:s date does ' +
        'not match with birth date', function () {
          person.socialId = '131256-7890';
          person.save(function (err) {
            expect(err.errors.socialId.message).to.equal('date_does_not_match');
          });
        });
      it('should save when socialId has a letter as last character', function () {
        person.socialId = '121256-789X';
        person.save(function (err) {
          expect(err).to.not.exist;
        });
      });
    });
  });
  afterEach(function(done) {
    Person.remove(function () {
      done();
    });
  });
});