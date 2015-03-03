// General utility functions
var utils = {};

// Get erraneous fields from mongoose error message
// for pretty and simple error responses
utils.prettyMongooseErrors = function (message) {
  var errors = [];
  for (var key in message.errors) {
    var field = {};  
    field[key] = message.errors[key].message;
    errors.push(field);
  }
  return errors;
};

exports.utils = utils;

// Validators

var validation = {};

validation.isName = function (value) {
  return /^[a-zA-Z\-äöå]+$/.test(value);
};

validation.isEmail = function (value) {
  return /\S+@\S+/.test(value);
};

validation.isSocialId = function (value) {
  return /^\d{6}-\d{3}\w$/.test(value);
};

validation.isValidDate = function (value) {
  var date = Date.parse(value);
  if (isNaN(date)) {
    return false;
  }
  return true;
};

validation.dateIsNotInFuture = function (value) {
  if (new Date(value).getTime() > new Date().getTime()) {
    return false;
  }
  return true;
};

exports.validation = validation;