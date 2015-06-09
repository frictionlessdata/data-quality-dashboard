_ = require('lodash');


function publisherCount(publishers) {
    return _.uniq(publishers, 'id').length;
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
    var validPercent = 0;
    var valid = _.filter(results, function(obj) {
        var score = obj.score ? obj.score : 0;
        if (score == 10) {
            return obj;
        }
    });
    if (results.length > 0) {
        validPercent = Math.round((valid.length / results.length) * 100);
    }
    return validPercent;
}

function totalScore(results) {
    var scores = [],
        score = 0;
    _.forEach(results, function(obj) {
        scores.push(parseInt(obj.score));
    });
    if (scores.length > 0) {
        score = Math.round(_.reduce(scores, function(sum, n) {return sum + n;}) / results.length * 10);
    }
    return score;
}

function publisherScore(publisher, results) {
    var scores = [],
        publisherScore = 0;
    // get all scores for this publisher from results
    _.forEach(results, function(obj) {
        if (obj.publisher_id === publisher) {
            var score = obj.score ? obj.score : 0;
            scores.push(parseInt(score));
        }
    });
    // set the publisher score to: sum of scores / number of scores * 10 (to have a percentage)
    if (scores.length > 0) {
        publisherScore = Math.round(_.reduce(scores, function(sum, n) {return sum + n;}) / scores.length * 10);
    }
    return publisherScore;
}

// return last publication date for a give publisher
function lastFileDate(publisher, results) {
    var publication = _.max(results, function(obj) {
        if (obj.publisher_id === publisher) {
            // we're after the timestamp of the publisher
            return new Date(_.last(obj.period_id.split('/')));
        } else {
            // if this is not the publisher we want, we return empty string
            return 0;
        }
    });

    if(publication && publication.period_id) {
        return new Date(_.last(publication.period_id.split('/')));
    } else {
        return 0;
    }
}

// return the latest score for a source and its timestamp from results
function sourceScore(source, results) {
    var scores = [],
        sourceScore = {score: 0, timestamp: 0};
    // get all scores and timestamps for this source from results
    _.forEach(results, function(obj) {
        if (obj.source_id === source) {
            var score = obj.score ? obj.score : 0;
            var timestamp = Date.parse(obj.timestamp);
            scores.push({score: parseInt(score) * 10, timestamp: timestamp});
        }
    });
    // set the source score to: the latest score
    if (scores.length > 0) {
        var latestScore = _.max(scores, function(elt) {
            return elt.timestamp;
        });
        sourceScore = latestScore;
    }
    return sourceScore;
}

module.exports = {
    publisherCount: publisherCount,
    sourceCount: sourceCount,
    timelyPercent: timelyPercent,
    validPercent: validPercent,
    totalScore: totalScore,
    publisherScore: publisherScore,
    sourceScore: sourceScore,
    lastFileDate: lastFileDate
};
