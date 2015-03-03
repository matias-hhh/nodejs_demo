var app = require('../../server.js'),
 request = require('supertest')(app);

var createPerson = function () {
  person = new Person({
    firstName:'Matti',
    lastName: 'Meikäläinen',
    email: 'matti.meikalainen@gmail.com',
    socialId: '123456-321Y',
    dayOfBirth: new Date('1989-08-08')
  });
  person.save();
};

describe('api-tests', function () {
  describe('person-api', function () {
    describe('/person', function () {
      describe('GET', function () {
        it('should return 200 and a list of persons if there is any', function () {
          request
            .get('/person')
            .expect
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
