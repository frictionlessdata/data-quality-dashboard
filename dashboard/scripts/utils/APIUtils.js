var ServerActionCreators = require('../actions/ServerActionCreators');
var CSVUtils = require('./CSVUtils');
var request = require('superagent');
var backend = 'https://rawgit.com/pwalsh/spd-example/master';
var publishers = backend + '/publishers.csv';
var sources = backend + '/sources.csv';
var results = backend + '/results.csv';
var instance = backend + '/instance.json';

// temp!!
var _publishers = [
    {id: 'gb_this', name: 'Publisher1', url: 'http://url', something: 'something here2', score: 7, source_count: 21, parent: null},
    {id: 'gb_that', name: 'Publisher2', url: 'http://url', something: 'something here2', score: 4, source_count: 13, parent: null},
    {id: 'gb_other', name: 'Publisher21', url: 'http://url', something: 'something here21', score: 4, source_count: 13, parent: 'gb_that'}
];
var _sources = [
    {id: 'gy12w', publisher_id: 'gb_this', name: 'Source1', url: 'https://raw.githubusercontent.com/okfn/tabular-validator/master/examples/valid.csv', schema: '', score: 9, revision: 2, report: 'http://url/', last_updated: '2015-01-01', period_id: '2015-01-01', extension: 'csv'},
    {id: 'au23h', publisher_id: 'gb_other', name: 'Source2', url: 'https://raw.githubusercontent.com/okfn/tabular-validator/master/examples/valid.csv', schema: '', score: 6, revision: 2, report: 'http://url/', last_updated: '2015-01-01', period_id: '2015-01-01', extension: 'csv'},
    {id: 're71q', publisher_id: 'gb_other', name: 'Source3', url: 'https://raw.githubusercontent.com/okfn/tabular-validator/master/examples/valid.csv', schema: '', score: 2, revision: 2, report: 'http://url/', last_updated: '2015-01-01', period_id: '2015-01-01', extension: 'csv'}
];
var _results = [
    {source_id: 're71q', publisher_id: 'gb_other', period_id: '2015-01-01', score: 2},
    {source_id: 'au23h', publisher_id: 'gb_other', period_id: '2015-01-01', score: 6},
    {source_id: 'gy12w', publisher_id: 'gb_this', period_id: '2015-01-01', score: 9}
];
var _instance = {
    name: 'Spend Publishing Dashboard',
    admin: 'paulywalsh@gmail.com',
    backend: 'https://rawgit.com/pwalsh/spd-example/master',
    validator_url: 'http://tabulator.herokuapp.com/jobs'
};

var _data = {
    publishers: _publishers,
    sources: _sources,
    results: _results,
    instance: _instance
};

module.exports = {
    getData: function(props, callback) {
        var data = {};
        var response = request
             .get(instance)
             .end(function(res) {
                 data.instance = JSON.parse(res.text);

                 request.get(publishers).end(function() {
                     data.publishers = _publishers;
                     callback(data);
                 });

                 ServerActionCreators.dataReady(data);
             });
    },
    _data: _data
};
