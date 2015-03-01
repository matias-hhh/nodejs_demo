var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = require('./app/router');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect('mongodb://localhost/nodejs_demo');

app.use('/api', router);

app.listen(8080);