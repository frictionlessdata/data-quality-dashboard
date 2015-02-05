var ServerActionCreators = require('../actions/ServerActionCreators');
var csv = require('csv');
var request = require('superagent');
var backend = 'https://rawgit.com/pwalsh/spd-example/master';
var publishers = backend + '/publishers.csv';
var sources = backend + '/sources.csv';
var results = backend + '/results.csv';
var instance = backend + '/instance.csv';


module.exports = {
    getData: function() {
        // var response = request
        //     .get(publisherUrl)
        //     .end(function(res) {
        //         csv.parse(res.text, function(error, data) {
        //             ServerActionCreators.publishersReady(data);
        //         });
        //     });
        // var data = {
        //     publishers: _publishers,
        //     sources: _sources,
        //     results: _results,
        //     instance: _instance
        // };
        ServerActionCreators.dataReady(data);
        return data;
    }
};
