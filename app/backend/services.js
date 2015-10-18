'use strict';

var Promise = require('bluebird');
var _ = require('lodash');
var config = require('../config');
var utils = require('../utils');

function getInstance() {
  return utils.getJSONEndpoint(config.get('backend').instance);
}

function getPublisherData() {
  return utils.getCSVEndpoint(config.get('backend').publishers);
}

function getSourceData() {
  return utils.getCSVEndpoint(config.get('backend').sources);
}

function getResultData() {
  return utils.getCSVEndpoint(config.get('backend').results);
}

function getRunData() {
  return utils.getCSVEndpoint(config.get('backend').runs);
}

function getPerformanceData() {
  return utils.getCSVEndpoint(config.get('backend').performance);
}

function makeDB() {
  return Promise.join(getPublisherData(), getSourceData(), getResultData(),
    getRunData(), getPerformanceData(), processData);
}

function processData(publishers, sources, results, runs, performance) {
  return {
    data: {
      publishers: publishers,
      sources: sources,
      results: results,
      runs: runs,
      performance: performance
    }
  };
}

module.exports = {
  getInstance: getInstance,
  makeDB: makeDB
};
