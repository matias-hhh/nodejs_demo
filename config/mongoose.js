var mongoose = require('mongoose'),
  config = require('./config');

// Database configuration
module.exports = function() {
  var db = mongoose.connect(config.db);
  // Print db errors to console
  db.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
  return db;
};