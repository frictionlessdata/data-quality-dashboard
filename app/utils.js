'use strict';

var Promise = require('bluebird');
var csv = require('csv');
var request = require('superagent-bluebird-promise');
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
    publishers: '{DB}/{FILE}'.replace('{DB}', db).replace('{FILE}', publisherTable),
    sources: '{DB}/{FILE}'.replace('{DB}', db).replace('{FILE}', sourceTable),
    results: '{DB}/{FILE}'.replace('{DB}', db).replace('{FILE}', resultTable),
    runs: '{DB}/{FILE}'.replace('{DB}', db).replace('{FILE}', runTable),
    performance: '{DB}/{FILE}'.replace('{DB}', db).replace('{FILE}', performanceTable),
    instance: '{DB}/{FILE}'.replace('{DB}', db).replace('{FILE}', instanceTable)
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

module.exports = {
  getBackend: getBackend,
  getJSONEndpoint: getJSONEndpoint,
  getCSVEndpoint: getCSVEndpoint
};
