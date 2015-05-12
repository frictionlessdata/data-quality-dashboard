_ = require('lodash');


function publisherCount(results) {
    return _.uniq(results, 'publisher_id').length;
}

function sourceCount(results) {
    return _.uniq(results, 'source_id').length;
}

function timelyPercent(results) {
    var valid = _.filter(results, function(obj) {
        if (obj.score >= 9) {
            return obj;
        }
    });
    return Math.round((valid.length / results.length) * 100);
}

function validPercent(results) {
    var valid = _.filter(results, function(obj) {
        if (obj.score >= 9) {
            return obj;
        }
    });
    return Math.round((valid.length / results.length) * 100);
}

function totalScore(results) {
    var scores = [];
    _.forEach(results, function(obj) {
        scores.push(parseInt(obj.score));
    });
    return Math.round(_.reduce(scores, function(sum, n) {return sum + n;}) / results.length);
}


module.exports = {
    publisherCount: publisherCount,
    sourceCount: sourceCount,
    timelyPercent: timelyPercent,
    validPercent: validPercent,
    totalScore: totalScore
};
