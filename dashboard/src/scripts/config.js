var dataBaseDir = 'https://rawgit.com/okfn/spd-data-example/master';
var publishers = dataBaseDir + '/publishers.csv';
var sources = dataBaseDir + '/sources.csv';
var results = dataBaseDir + '/results.csv';
var runs = dataBaseDir + '/runs.csv';
var instance = dataBaseDir + '/instance.json';


module.exports = {
    backend: {
        publishers: publishers,
        sources: sources,
        results: results,
        runs: runs,
        instance: instance
    }
};
