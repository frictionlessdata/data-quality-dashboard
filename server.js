'use strict';

// NOTE: We compile ES6 on the server at runtime, but not this module.
require('babel-core/register');

var throng = require('throng');
var app = require('./app');
var WORKERS = process.env.WEB_CONCURRENCY || 1;

// NOTE: we cache our data in memory on the app object, so if we start to
// horizontally scale, we should also setup a service for the cache.
throng(app.start, {
  workers: WORKERS,
  lifetime: Infinity
});
