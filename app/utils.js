'use strict';

import Promise from 'bluebird';
import csv from 'csv';
import request from 'superagent-bluebird-promise';

var csvParser = Promise.promisify(csv.parse);

function getBackend() {
  var db = process.env.DATABASE_LOCATION ||
        'https://rawgit.com/okfn/uk-expenditure-files/master/data';
  var publisherTable = process.env.PUBLISHER_TABLE || 'publishers.csv';
  var sourceTable = process.env.SOURCE_TABLE || 'sources.csv';
  var resultTable = process.env.RESULT_TABLE || 'results.csv';
  var runTable = process.env.RUN_TABLE || 'runs.csv';
  var performanceTable = process.env.PERFORMANCE_TABLE || 'performance.csv';
  var instanceTable = process.env.INSTANCE_TABLE || 'instance.json';
  return {
    publishers: `${db}/${publisherTable}`,
    sources: `${db}/${sourceTable}`,
    results: `${db}/${resultTable}`,
    runs: `${db}/${runTable}`,
    performance: `${db}/${performanceTable}`,
    instance: `${db}/${instanceTable}`
  };
}

function getJSONEndpoint(endpoint, name) {
  return request
    .get(endpoint)
    .then(function(response) {
      return response.body;
    })
    .catch(console.trace.bind(console));
}

function getCSVEndpoint(endpoint, name) {
  return request
    .get(endpoint)
    .then(function(response) {
      return csvParser(response.text, {columns: true})
        .then(function(result) {
          return result;
        });
    })
    .catch(console.trace.bind(console));
}

export default { getBackend, getJSONEndpoint, getCSVEndpoint };
