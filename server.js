var config = require('./lib/config.js');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// Middleware
app.use(bodyParser.json());

// Setting
app.set('jwtSecret', config.jwtSecret);

// Simple logger
app.use(function(req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
});

// Routing
app.use('/proverbs', require('./routes/proverbs/proverbs'));

// Starting Server
app.listen(config.port, function() {
  console.log('Server starts on port: %s', config.port);
});

