'use strict';

var _ = require('lodash');
var path = require('path');
var nconf = require('nconf');
var utils = require('./utils');

nconf.file({
  file: path.join(path.dirname(__dirname), 'settings.json')
});

nconf.defaults({
  port: process.env.PORT || 3000,
  backend: utils.getBackend(),
  cacheData: process.env.CACHE_DATA || true,
  contentDir: process.env.CONTENT_DIR || path.join(__dirname, 'content')
});

module.exports = nconf;
