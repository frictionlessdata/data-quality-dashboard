'use strict';

import Promise from 'bluebird';
import _ from 'lodash';
import config from '../config';
import utils from '../utils';

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
  return Promise.join(getInstance(), getPublisherData(), getSourceData(), getResultData(),
    getRunData(), getPerformanceData(), processData);
}

function processData(instance, publishers, sources, results, runs, performance) {
  return {
    data: {
      instance: instance,
      publishers: publishers,
      sources: sources,
      results: results,
      runs: runs,
      performance: performance
    }
  };
}

export default { getInstance, makeDB };
