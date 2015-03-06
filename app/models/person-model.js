var mongoose = require('mongoose'),
  validation = require('../utils').validation,
  Schema = mongoose.Schema;

/*
 *  Custom message for 'required'-validation error
 */
mongoose.Error.messages.general.required = 'missing_field';

/*
 *  Custom validator definitons
 */
var nameValidator = [
  {validator: validation.isName, msg: 'invalid'},
];

var emailValidator = [
  {validator: validation.isEmail, msg: 'invalid'},
];

var socialIdValidator = [
  {validator: validation.datesMatch, msg: 'date_does_not_match'},
  {validator: validation.isSocialId, msg: 'invalid'},
];

var dayOfBirthValidator = [
  {validator: validation.dateIsNotInFuture, msg: 'date_in_future'},
];

/*
 *  Schema definition
 */
var PersonSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    validate: nameValidator
  },
  lastName: {type: String,
    required: true,
    validate: nameValidator,
    index: true
  },
  email: {
    type: String,
    required: true,
    validate: emailValidator,
    unique: true
  },
  dayOfBirth: {
    type: Date,
    required: true,
    validate: dayOfBirthValidator
  },
  socialId:   {
    type: String,
    required: true,
    validate: socialIdValidator,
    index: true,
    unique: true
  }
});

module.exports = mongoose.model('Person', PersonSchema);