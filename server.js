process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Get express- and db-configurations from config-folder
var express = require('./config/express'),
  config = require('./config/config'),
  mongoose = require('./config/mongoose');

// Connect to database
var db = mongoose();

// Start the server
var app = express();

app.listen(config.port);

// app export for testing
module.exports = app;