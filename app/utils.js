'use strict'

import 'isomorphic-fetch'
import Promise from 'bluebird'
import csv from 'csv'

let csvParser = Promise.promisify(csv.parse)

function getBackend() {
  var db = process.env.DATABASE_LOCATION ||
        'https://rawgit.com/okfn/uk-expenditure-files/master/data'
  var publisherTable = process.env.PUBLISHER_TABLE || 'publishers.csv'
  var sourceTable = process.env.SOURCE_TABLE || 'sources.csv'
  var resultTable = process.env.RESULT_TABLE || 'results.csv'
  var runTable = process.env.RUN_TABLE || 'runs.csv'
  var performanceTable = process.env.PERFORMANCE_TABLE || 'performance.csv'
  var instanceTable = process.env.INSTANCE_TABLE || 'instance.json'
  return {
    publishers: `${db}/${publisherTable}`,
    sources: `${db}/${sourceTable}`,
    results: `${db}/${resultTable}`,
    runs: `${db}/${runTable}`,
    performance: `${db}/${performanceTable}`,
    instance: `${db}/${instanceTable}`
  }
}

function getJSONEndpoint(endpoint) {
  return fetch(endpoint)
    .then(response => response.json())
    .catch(console.trace.bind(console))
}

function getCSVEndpoint(endpoint) {
  return fetch(endpoint)
    .then(response => response.text())
    .then(text => csvParser(text, {columns: true}))
    .catch(console.trace.bind(console))
}

export default { getBackend, getJSONEndpoint, getCSVEndpoint }
