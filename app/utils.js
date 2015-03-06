/** 
 * General utility functions
 */
var utils = {};

/** 
 * Make a pretty errorlist out of Mongooses validation errors sorted in 
 * alphabetical order. Works for MongoDB uniqueness errors and CastErrors also.
 */
utils.prettyMongooseErrors = function (err) {
  var fields = [];
  var errors = {};
  var field;
  // If error comes from MongoDB conserning uniqueness of a field
  if (err && (11000 === err.code || 11001 === err.code)) {
    field = err.err.match(/\$(.*)_/);
    errors[field[1]] = 'already_exists';
    return errors;
  }
  // If error is a CastError
  if (err.name === 'CastError') {
    field = err.path;
    errors[field] = 'invalid';
    return errors;
  }
  // Regular Mongoose validation errors
  for (var key in err.errors) {
    fields.push(key);
  }
  fields.sort();
  for (var i = 0; i < fields.length; i++) {  
    errors[fields[i]] = err.errors[fields[i]].message;
  }
  return errors;
};

/*
* Parse Person-model's socialId's date to 'yyyy-mm-dd'-format string
*/
utils.parseSocialIdDate = function (socialId) {
  try {
    var socialIdDate = socialId.substring(0,6);
    var slicedDate = {};
    slicedDate.day = socialIdDate.substring(0,2);
    slicedDate.month = socialIdDate.substring(2,4);
    slicedDate.year = socialIdDate.substring(4,6);
    var centuryId = socialId.charAt(6);
    if ( centuryId === '+') {
      slicedDate.year =  '18' + slicedDate.year;
    } else if (centuryId === 'A') {
      slicedDate.year =  '20' + slicedDate.year;
    } else {
      slicedDate.year =  '19' + slicedDate.year;
    }
    socialIdDate = slicedDate.year + '-' + slicedDate.month + '-' + slicedDate.day;
    return socialIdDate;
  } catch (err) {
    return 'invalid_socialId';
  }
  
};

/*
* Parse Date-object to 'yyyy-mm-dd'-format string.
*/
utils.parseDateObject = function (date) {
  try {
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1);
    if (month.length === 1) {
      month = '0' + month;
    }
    var day = String(date.getDate());
    if (day.length === 1) {
      day = '0' + day;
    }
    dateString = year + '-' + month + '-' + day;
    return dateString;
  } catch (err) {
    return 'invalid date';
  }
};
module.exports.utils = utils;

/**
 * Validators for mongoose validation
 */
var validation = {};

// Accept only letters and dashes
validation.isName = function (value, respond) {
  respond(/^[a-zA-ZäöåÄÖÅ]{2,}\-{0,1}[a-zA-ZäöåÄÖÅ]*$/.test(value));
};

// A simple email-validator
validation.isEmail = function (value ,respond) {
  respond(/\S+@\S+/.test(value));
};

// Test that Finnish social security number is correctly formatted
validation.isSocialId = function (value, respond) {
  respond(/^\d{6}[+-A]\d{3}[0-9A-Y]$/.test(value));
};

// Check that socialId's date matches with birth date
validation.datesMatch = function (value, respond) {
  var socialIdDateString = utils.parseSocialIdDate(value);
  var dayOfBirthString = utils.parseDateObject(this.dayOfBirth);
  respond(socialIdDateString == dayOfBirthString);
};

// Check that date is not set in the future
validation.dateIsNotInFuture = function (value, respond) {
  if (new Date(value).getTime() > new Date().getTime()) {
    respond(false);
  }
  respond(true);
};

module.exports.validation = validation;