var express = require('express');
var router = express.Router();
var Person = require('./person');

router.use(function (req, res, next) {
  console.log(req.method, req.url, res.statusCode);
  next();
});

router.get('/', function (req, res) {
  res.json({message: 'It works!'});
});

router.route('/persons')

  .get(function (req, res) {
    Person.find(function (err, persons) {
      if (err) {
        res.send(err);
      }
      res.json(persons);
    });
  })

  .post(function(req, res) {
    var person = new Person();
    
    person.firstName = req.body.first_name;
    person.lastName = req.body.last_name;
    person.email = req.body.email;
    person.socialId = req.body.social_id;
    person.dayOfBirth = Date.parse(req.body.day_of_birth);

    person.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({message: 'person successfully created!'});
    });
  });

router.route('/persons/:person_id')

    .get(function (req, res) {
      Person.findById(req.params.person_id, function (err, person) {
        if (err) {
          res.send(err);
        }
        res.json(person);
      });
    })

    .put(function (req, res) {
      Person.findbyId(req.params.person_id, function (err, person) {
        if (err){
          res.send(err);
        }
        person.firstName = req.body.first_name;
        person.lastName = req.body.last_name;
        person.email = req.body.email;
        person.socialId = req.body.social_id;
        person.dayOfBirth = req.body.day_of_birth;

        person.save(function (err) {
          if (err) {
            res.send(err);
          }
          res.json({message: 'person successfully updated!'});
        });
      });
    })

    .delete(function (req, res) {
      Person.remove({_id: req.params.person_id}, function (err, person) {
        if (err) {
          res.send(err);
        }
        res.json({message: 'person successfully deleted!'});
      });
    });

module.exports = router;