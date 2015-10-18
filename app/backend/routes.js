'use strict';

var router = require('express').Router();
var controllers = require('./controllers');

module.exports = function routes() {
  router.get('/about', controllers.about);
  router.get('/faq', controllers.faq);
  router.get('/pricing', controllers.pricing);
  router.get('/api', controllers.api);
  router.get('*', controllers.dashboard);
  return router;
};
