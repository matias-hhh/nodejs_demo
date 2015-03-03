var mongoose = require('../../config/mongoose'),
  Person = require('../models/person'),
  should = require('chai').should(),
  db = mongoose();

var person;

describe('Model tests', function () {
  describe('Person', function () { 
    beforeEach(function () {
      person = new Person({
        firstName:'Matti',
        lastName: 'Meikäläinen',
        email: 'matti.meikalainen@gmail.com',
        socialId: '123456-321Y',
        dayOfBirth: new Date('1989-08-08')
      });
    });

    describe('save-method', function () {
      it('should save when no errors in input data', function () {
        person.save(function (err) {
          should.not.exist(err);
        });
      });
      describe('firstName', function () {
        it('should not save without firstName', function () {
          person.firstName = '';
          person.save(function (err) {
            should.exist(err);
          });
        });
        it('should not save with special charatcers in firstName', function () {
          person.firstName = 'M@tti';
          person.save(function (err) {
            should.exist(err);
          });
        });
      });
        describe('lastName', function () {
        it('should not save without lastName', function () {
          person.lastName = '';
          person.save(function (err) {
            should.exist(err);
          });
        });
        it('should not save with special charatcers in lastName', function () {
          person.lastName = 'M€ikäläinen';
          person.save(function (err) {
            should.exist(err);
                      });
        });
      });
      describe('email', function () {
        it('should not save without email', function () {
          person.email = '';
          person.save(function (err) {
            should.exist(err);
          });
        });
        it('should not save when email has no @-character ', function () {
          person.email = 'matti.meikalainen.gmail.com';
          person.save(function (err) {
            should.exist(err);
          });
        });
        it('should not save when email has no characters before @-character ', function () {
          person.email = '@gmail.com';
          person.save(function (err) {
            should.exist(err);
          });
        });
        it('should not save when email has no characters after @-character ', function () {
          person.email = 'matti.meikalainen@';
          person.save(function (err) {
            should.exist(err);
          });
        });
      });
      describe('socialId', function () {
        it('should not save without socialId', function () {
          person.socialId = '';
          person.save(function (err) {
            should.exist(err);
          });
        });
        it('should not save when socialId has no dash', function () {
          person.socialId = '1234567890';
          person.save(function (err) {
            should.exist(err);
          });
        });
        it('should not save when socialId has dash in wrong place', function () {
          person.socialId = '12345-67890';
          person.save(function (err) {
            should.exist(err);
          });
        });
        it('should not save when socialId has letters in wrong place', function () {
          person.socialId = '123A56-7890';
          person.save(function (err) {
            should.exist(err);
          });
        });
        it('should not save when socialId does not have enough characters ' +
          'after dash', function () {
            person.socialId = '123456-789';
            person.save(function (err) {
              should.exist(err);
            });
          });
        it('should not save when socialId does not have enough characters ' +
          'before dash', function () {
            person.socialId = '12345-7890';
            person.save(function (err) {
              should.exist(err);
            });
          });
        it('should save when socialId has a letter as last character', function () {
          person.socialId = '123456-789X';
          person.save(function (err) {
            should.not.exist(err);
          });
        });
      });
      describe('dayOfBirth', function () {
        it('should not save without dayOfBirth', function () {
          person.dayOfBirth = '';
          person.save(function (err) {
            should.exist(err);
          });
        });
        it('should not save when dayOfBirth is an invalid string', function () {
          person.dayOfBirth = '2000-a3-11';
          person.save(function (err) {
            should.exist(err);
          });
        });
        it('should not save when dayOfBirth is in the future', function () {
          person.dayOfBirth =  '2016-08-08';
          person.save(function (err) {
            should.exist(err);
          });
        });
        it('should save when dayOfBirth is Date-compatible string', function () {
          person.dayOfBirth = '1989-12-12';
          person.save(function (err) {
            should.not.exist(err);
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
});