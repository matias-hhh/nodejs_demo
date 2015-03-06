var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  path = require('path'),
  personsApi = require('../app/routes/persons-router'),
  index = require('../app/routes/index-router');

module.exports = function () {
  // Initialize express
  var app = express();
  // Configure jade template engine
  app.set('views', './app/views');
  app.set('view engine', 'jade');
  // Configure express modules
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(methodOverride());
  // Configure routes
  app.use('/api', personsApi);
  app.use('/', index);
  // Configure static files
  app.use(express.static(path.resolve('./public')));

  return app;
};