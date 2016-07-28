'use strict'

import 'isomorphic-fetch'
import Promise from 'bluebird'
import csv from 'csv'

let csvParser = Promise.promisify(csv.parse)

function getBackend() {
  var db = process.env.DATABASE_LOCATION ||
        'https://rawgit.com/okfn/data-quality-uk-25k-spend/master/data'
  var publisherTable = process.env.PUBLISHER_TABLE || 'publishers.csv'
  var sourceTable = process.env.SOURCE_TABLE || 'sources.csv'
  var resultTable = process.env.RESULT_TABLE || 'results.csv'
  var runTable = process.env.RUN_TABLE || 'runs.csv'
  var performanceTable = process.env.PERFORMANCE_TABLE || 'performance.csv'
  var instanceTable = process.env.INSTANCE_TABLE || 'instance.json'
  var showPricing = process.env.SHOW_PRICING_IN_MENU || false
  showPricing === 'true' ? showPricing = true : showPricing = false
  var pricingPageUrl = process.env.PRICING_PAGE_URL || ''
  if (showPricing && !pricingPageUrl) {
    throw Error('Please provide PRICING_PAGE_URL if you want to show pricing.');
  }
  return {
    publishers: `${db}/${publisherTable}`,
    sources: `${db}/${sourceTable}`,
    results: `${db}/${resultTable}`,
    runs: `${db}/${runTable}`,
    performance: `${db}/${performanceTable}`,
    instance: `${db}/${instanceTable}`,
    pricingPageUrl: pricingPageUrl,
    showPricing: showPricing
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
