var ActionCreators = require('../actions/ServerActionCreators');
var Config = require('../config.js');
var request = require('superagent');
var parse = require('csv-parse');

function getJSONEndpoint(endpoint, name) {
    request
        .get(endpoint)
        .end(function(error, response) {
            var raw = response.body;
            ActionCreators.receiveAll(raw, name);
        });
}

function getCSVEndpoint(endpoint, name) {
    request
        .get(endpoint)
        .end(function(error, response) {
            parse(response.text, {columns: true}, function(error, output) {
                var raw = output;
                ActionCreators.receiveAll(raw, name);
            });
        });
}

function APIUtils() {
    getJSONEndpoint(Config.backend.instance, 'instance');
    getCSVEndpoint(Config.backend.publishers, 'publishers');
    getCSVEndpoint(Config.backend.sources, 'sources');
    getCSVEndpoint(Config.backend.results, 'results');
    getCSVEndpoint(Config.backend.runs, 'runs');
}

module.exports = APIUtils;
