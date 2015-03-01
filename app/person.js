var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PersonSchema    = new Schema({
  firstName:      {type: String, default: ''},
  lastName:       {type: String, default: ''},
  email:          {type: String, default: ''},
  socialId:       {type: String, default: ''},
  dayOfBirth:     {type: Date,   default: Date.now}
});

module.exports = mongoose.model('Person', PersonSchema);