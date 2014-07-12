var config = require('./lib/config.js');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// Middleware
app.use(bodyParser.json());

// Simple logger
app.use(function(req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
});

app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods','POST, GET, OPTIONS, DELETE, PUT, HEAD');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Routing
app.use('/proverbs', require('./routes/proverbs/proverbs'));

// Starting Server
app.listen(config.port, function() {
  console.log('Server starts on port: %s', config.port);
});

