var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  router = require('../app/routes/persons');

module.exports = function () {
  var app = express();
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use('/api', router);

  return app;
};