var mongoose = require('mongoose'),
  validation = require('../utils').validation,
  Schema = mongoose.Schema;

// Custom message for 'required'-error
mongoose.Error.messages.general.required = 'missing_field';

// Custom validator definitons
var nameValidator = [
  {validator: validation.isName, msg: 'invalid'},
];

var emailValidator = [
  {validator: validation.isEmail, msg: 'invalid'},
];

var socialIdValidator = [
  {validator: validation.isSocialId, msg: 'invalid'},
];

var dayOfBirthValidator = [
  {validator: validation.isValidDate, msg: 'invalid'},
  {validator: validation.dateIsNotInFuture, msg: 'date_in_future'},
];

// Schema definition
var PersonSchema = new Schema({
  firstName: {type: String, required: true, validate: nameValidator},
  lastName: {type: String, required: true, validate: nameValidator, index: true},
  email: {type: String, required: true, validate: emailValidator},
  socialId: {type: String, required: true, validate: socialIdValidator, index: true},
  dayOfBirth: {type: String, required: true, validate: dayOfBirthValidator}
});

module.exports = mongoose.model('Person', PersonSchema);