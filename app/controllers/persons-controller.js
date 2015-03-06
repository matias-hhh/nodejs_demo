var Person = require('../models/person-model'),
  utils = require('../utils').utils;

/**
 *  Get a list of all persons in the database
 */
exports.list = function (req, res) {
  Person.find(function (err, persons) {
    if (err) {
      return res.status(404).json({message: 'resource not found'});
    }
    if (persons.length > 0) {
      res.json({persons: persons});
    } else {
      res.json({message: 'there are no persons in the database'});
    }
  });
};

/*
 *  Create a person
 */
exports.create = function(req, res) {
  var person = new Person({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    socialId: req.body.socialId,
    dayOfBirth: req.body.dayOfBirth
  });

  person.save(function (err) {
    if (err) {
      var errors = utils.prettyMongooseErrors(err);
      return res.status(400).json({
        message: 'request has erraneous fields',
        errors: errors
      });
    }
    res.status(201).json({message: 'person successfully created'});
    
  });
};

/*
 *  Get  a person specified by id
 */
exports.read = function (req, res) {
  Person.findById(req.params.personId, function (err, person) {
    if (err) {
      return res.status(404).json({message: 'resource not found'});
    }
    res.json(person);
  });
};

/*
 *  Update a person specified by id
 */
exports.update = function (req, res) {
  Person.findById(req.params.personId, function (err, person) {
    if (err) {
      return res.status(404).json({message: 'resource not found'});
    }
    person.firstName = req.body.firstName;
    person.lastName = req.body.lastName;
    person.email = req.body.email;
    person.socialId = req.body.socialId;
    person.dayOfBirth = req.body.dayOfBirth;

    person.save(function (err) {
      if (err) {
        var errors = utils.prettyMongooseErrors(err);
        return res.status(400).json({
          message: 'request has erraneous fields',
          errors: errors
        });
      }
      res.json({message: 'person successfully updated'});
    });
  });
};

/*
 *  Delete a person specified by id
 */
exports.delete = function (req, res) {
  Person.remove({_id: req.params.personId}, function (err, person) {
    if (err) {
      return res.status(404).json({message: 'resource not found'});
    }
    res.json({message: 'person successfully deleted'});
  });
};