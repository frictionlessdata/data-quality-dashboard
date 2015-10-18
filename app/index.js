'use strict';

var bootstrap = require('./bootstrap');

module.exports = function start() {
  var express = require('express');
  var app = express();
  app = bootstrap(app, express);
  app.listen(app.get('port'), function() {
    console.log('Serving from port ' + app.get('port'));
  });
};
