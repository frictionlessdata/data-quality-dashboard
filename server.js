'use strict';
var throng = require('throng');
var app = require('./app');
var WORKERS = process.env.WEB_CONCURRENCY || 1;

throng(app, {
  workers: WORKERS,
  lifetime: Infinity
});
