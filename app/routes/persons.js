var express = require('express'),
 router = express.Router(),
 Person = require('../models/person'),
 utils = require('../utils').utils;

// Log every request to console
router.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});

// Person-api
router.route('/persons')

  .get(function (req, res) {
    Person.find(function (err, persons) {
      if (err) {
        return res.status(404).json({message: 'resource not found'});
      }
      if (persons) {
        res.json({persons: persons});
      } else {
        res.json({message: 'there are no persons in the database'});
      }
    });
  })

  .post(function(req, res) {
    var person = new Person({
      firstName: req.body.first_name,
      lastName: req.body.last_name,
      email: req.body.email,
      socialId: req.body.social_id,
      dayOfBirth: req.body.day_of_birth
    });

    person.save(function (err) {
      if (err) {
        errors = utils.prettyMongooseErrors(err);
        console.log(err);
        return res.status(400).json({
          message: 'Request has erraneous fields',
          errors: errors
        });
      }
      res.status(201).json({message: 'person successfully created.'});
      
    });
  });

router.route('/persons/:person_id')

    .get(function (req, res) {
      Person.findById(req.params.person_id, function (err, person) {
        if (err) {
          return res.status(404).json({message: 'resource not found'});
        }
        res.json(person);
      });
    })

    .put(function (req, res) {
      Person.findById(req.params.person_id, function (err, person) {
        if (err){
          return res.status(404).json({message: 'resource not found'});
        }
        person.firstName = req.body.first_name;
        person.lastName = req.body.last_name;
        person.email = req.body.email;
        person.socialId = req.body.social_id;
        person.dayOfBirth = req.body.day_of_birth;

        person.save(function (err) {
          if (err) {
            errors = utils.prettyMongooseErrors(err);
            return res.status(400).json({
              message: 'Request has erraneous fields',
              errors: errors
            });
          }
          res.json({message: 'person successfully updated.'});
        });
      });
    })

    .delete(function (req, res) {
      Person.remove({_id: req.params.person_id}, function (err, person) {
        if (err) {
          return res.status(404).json({message: 'resource not found'});
        }
        res.json({message: 'person successfully deleted.'});
      });
    });

module.exports = router;