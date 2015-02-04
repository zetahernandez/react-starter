'use strict';

var path = require('path');
var express = require('express');
var compression = require('compression');

var app = express();

// GZip compression
app.use(compression());

// is it ALIVE?!
app.get('/heartbeat', function(req, res) {
  res.status(200).json('OK');
});

// static route
app.use(express.static(path.join(__dirname, '/build')));

var port;
if (process.env.port) {
  port = process.env.port;
} else if (process.env.NODE_ENV === 'test') {
  port = 3001;
} else {
  port = 3000;
}

var server = app.listen(port, function() {
  var host = server.address().address;
  var thePort = server.address().port;
  console.log('Express app listening at http://%s:%s', host, thePort);
});

// Export app in module for testing
module.exports = app;
