var React = require('react');
var _ = require('lodash');
var Router = require('react-router');
var Link = Router.Link;
var CalcUtils = require('./CalcUtils.js');


function searchIn(objects, field, query) {
        var lookup = _.map(objects, field);
        var matches = _.filter(lookup, function(candidate) {
            return candidate.toLowerCase().indexOf(query.toLowerCase()) > -1;
        });
        return matches;
}

function makeOverviewNumber(number, digitWidth) {
    var spans = [],
        spanStyle = {
            width: Math.floor(digitWidth) + 'px',
            height: Math.floor(1.6 * digitWidth) + 'px',
            fontSize: Math.floor(1.425 * digitWidth) + 'px',
            lineHeight: Math.floor(1.55 * digitWidth) + 'px'
        };
    _.forEach(number, function(c) {
        spans.push(<span style={spanStyle}>{c}</span>);
    });
    return spans;
}

function makeOverviewCounter(label, number, counterPadding, digitWidth) {
    if (counterPadding > 0) {
        var digitCount = number.length;
        var counterWidth = (digitCount * (digitWidth + 6)) + (2 * counterPadding);
        var counterStyle = {
            width: counterWidth + 'px',
            paddingLeft: counterPadding + 'px',
            paddingRight: counterPadding + 'px'
        };
    } else {
        var counterStyle = {
            width: '100%',
            paddingLeft: '0',
            paddingRight: '0'
        };
    }
    return <li className="counter" style={counterStyle}><span className="value">{makeOverviewNumber(number, digitWidth)}</span> <span className="label">{label}</span></li>;
}

function makeOverview(results, page) {
    var documentWidth = document.body.clientWidth,
        availableWidth = 0,
        counters = [],
        digitMargins = 6,
        digitCount = 0,
        spacePerDigit, digitMaxWidth, digitWidth, counterPadding;

    if (page === 'main') {
        var values = {
            publisherCount: {
                label: 'publishers',
                value: CalcUtils.publisherCount(results) + ''
            },
            sourceCount: {
                label: 'data files',
                value: CalcUtils.sourceCount(results) + ''
            },
            validPercent: {
                label: '% valid',
                value: CalcUtils.validPercent(results) + ''
            },
            totalScore: {
                label: 'average score',
                value: CalcUtils.totalScore(results) + ''
            }
        };
    } else if (page === 'publisher') {
        var values = {
            sourceCount: {
                label: 'data files',
                value: CalcUtils.sourceCount(results) + ''
            },
            validPercent: {
                label: '% valid',
                value: CalcUtils.validPercent(results) + ''
            },
            totalScore: {
                label: 'average score',
                value: CalcUtils.totalScore(results) + ''
            }
        };
    }
    

    if (documentWidth >= 980 && documentWidth < 1180) {
        availableWidth = 980;
    } else if (documentWidth >= 1180) {
        availableWidth = 1180;
    }

    if (availableWidth > 0) {
        _.forEach(values, function(obj) {
            digitCount += obj.value.length;
        });
        spacePerDigit = availableWidth / (digitCount + 4);
        digitMaxWidth = spacePerDigit - digitMargins;
        digitWidth = digitMaxWidth >= 80 ? 80 : digitMaxWidth;
        allDigitWidth = digitCount * (digitWidth + digitMargins);
        counterPadding = (availableWidth - allDigitWidth) / 8;
        _.forEach(values, function(obj) {
            counters.push(makeOverviewCounter(obj.label, obj.value, counterPadding, digitWidth));
        });
    } else {
        _.forEach(values, function(obj) {
            digitCount = obj.value.length;
            spacePerDigit = documentWidth / (digitCount + 2);
            digitMaxWidth = spacePerDigit - digitMargins;
            digitWidth = digitMaxWidth >= 80 ? 80 : digitMaxWidth;
            allDigitWidth = digitCount * (digitWidth + digitMargins);
            counterPadding = 0;
            counters.push(makeOverviewCounter(obj.label, obj.value, counterPadding, digitWidth));
        });
    }

    return counters;
}

function makeTableHeader(obj, table) {
    var _header = [];
    if (table === 'publishers') {
        _.forEach(obj, function(value, key) {
            switch(key) {
                case 'title':
                case 'type':
                case 'homepage':
                case 'contact':
                case 'email':
                    _header.push(<th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>);
                    break;
            }
        });
        _header.push(<th key="score" className="score">Score</th>);
    } else if (table === 'sources') {
        _.forEach(obj, function(value, key) {
            switch(key) {
                case 'title':
                case 'format':
                    _header.push(<th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>);
                break;

                case 'data':
                    _header.push(<th key={key}>URL</th>);
                break;

                case 'last_modified':
                    _header.push(<th key={key}>Last modified</th>);
                break;

                case 'period_id':
                    _header.push(<th key={key} className="score">Score</th>);
                break;
            }
        });
    }
    return _header;
}

function makeTableBody(objects, results, options) {
    var _body = [],
        _unsorted = [];
    if (options.route === 'publishers') {
        // for each publisher, get its score from results and return a new array of publishers with scores
        _unsorted = _.map(objects, function(obj) {
            var _publisherScore = CalcUtils.publisherScore(obj.id, results);
            var _objWithScore = _.cloneDeep(obj);
            _objWithScore.score = _publisherScore;
            return _objWithScore;
        });
        // sort publishers by score in descending order and by name in ascending order
        _body = _.sortBy(_.sortBy(_unsorted, 'title').reverse(), 'score').reverse();
        // for each publisher, return a table row
        _body = _.map(_body, function(obj) {
            return <tr key={obj.id}>{makeTableRow(obj, options, 'publishers')}</tr>;
        });
    } else if (options.route === 'sources') {
        // for each source, get its score and timestamp from results and return a new array of sources with scores and timestamps
        _unsorted = _.map(objects, function(obj) {
            var _sourceData = CalcUtils.sourceScore(obj.id, results);
            var _sourceTimestamp = new Date(_sourceData.timestamp);
            var _displayedTimestamp = _sourceTimestamp.getFullYear() + '-' +  ('0' + (_sourceTimestamp.getMonth() + 1)).slice(-2) + '-' +  ('0' + _sourceTimestamp.getDate()).slice(-2);
            var _sourceLastModified = new Date(obj.last_modified);
            if (obj.last_modified != '') {
                var _displayedLastModified = _sourceLastModified.getFullYear() + '-' +  ('0' + (_sourceLastModified.getMonth() + 1)).slice(-2) + '-' +  ('0' + _sourceLastModified.getDate()).slice(-2);
            } else {
                var _displayedLastModified = ''
            }
            var _objWithScore = _.cloneDeep(obj);
            _objWithScore.score = _sourceData.score;
            _objWithScore.timestamp = _displayedTimestamp;
            _objWithScore.refTimestamp = _sourceData.timestamp;
            _objWithScore.last_modified = _displayedLastModified;
            return _objWithScore;
        });
        // sort sources by score and by date in descending order, then by publisher id and by name in ascending order
        _body = _.sortByAll(_.sortByAll(_unsorted, 'title').reverse(), ['score', 'refTimestamp']).reverse();
        // for each source, return a table row
        _body = _.map(_body, function(obj) {
            return <tr key={obj.id}>{makeTableRow(obj, options, 'sources')}</tr>;
        });
    }
    return _body;
}

function makeTableRow(obj, options, table) {
    var _row = [];
    if (table === 'publishers') {
        _.forEach(obj, function(value, key) {
            var _cell;

            if (key === 'title') {

		 _cell = <td key={key}><Link to={options.route} params={{lookup: obj.id}}>{value}</Link></td>;

            } else if (key === 'homepage') {

                _cell = <td key={key}><a href={value}><span className="glyphicon glyphicon-link" aria-hidden="true"></span></a></td>;

            } else if (key === 'email') {

                _cell = <td key={key}><a href={'mailto:' + value}><span className="glyphicon glyphicon-envelope" aria-hidden="true"></span></a></td>;

            } else if (key === 'score') {

                var _c;
                if (value <= 4) {
                    _c = 'danger';
                } else if (value <= 9) {
                    _c = 'warning';
                } else {
                    _c = 'success';
                }
                _cell = <td key={key} className={'score ' + _c}>{value}</td>;

            } else if (key === 'type') {

                _cell = <td key={key}>{value.charAt(0).toUpperCase() + value.slice(1).replace('-', ' ')}</td>

            } else if (key == 'contact') {

                _cell = <td key={key}>{value}</td>;

            }
            _row.push(_cell);
        });
    } else if (table === 'sources') {
        _.forEach(obj, function(value, key) {
            var _cell;

            if (key === 'title') {

                _cell = <td key={key}><Link to={options.route} params={{lookup: obj.id}}>{value}</Link></td>;

            } else if (key === 'data') {

                _cell = <td key={key}><a href={value}><span className="glyphicon glyphicon-link" aria-hidden="true"></span></a></td>;

            } else if (key === 'score') {

                var _c;
                if (value <= 4) {
                    _c = 'danger';
                } else if (value <= 9) {
                    _c = 'warning';
                } else {
                    _c = 'success';
                }
                _cell = <td key={key} className={'score ' + _c}>{value}</td>;

            } else if (key === 'format' || key === 'last_modified') {

                _cell = <td key={key}>{value}</td>;

            }
            _row.push(_cell);
        });
    }
    return _row;
}

function filterTable() {
    //
}

function shiftToStartMonth(data, currentDate) {
    var currentMonth = currentDate.getMonth(),
        currentYear = currentDate.getFullYear(),
        lastYear = currentYear - 1,
        startMonth,
        yearLabel,
        shiftedPercent = [null, null, null, null, null, null, null, null, null, null, null],
        shiftedLabels = [];

    // set the start month to 12 months ago
    if (currentMonth != 11) {
        startMonth = currentMonth + 1;
    } else {
        startMonth = 0;
    }

    if (startMonth > 0) {
        // shift validPercent array so the value at index 0 corresponds to the start month value
        _.forEach(data.validPercent, function(value, key) {
            var i = key - startMonth;
            if (i >= 0) {
                shiftedPercent[i] = value;
            } else {
                shiftedPercent[i + 12] = value;
            }
        });
        data.validPercent = shiftedPercent;
    }

    // shift labels array so the label at index 0 corresponds to the start month label
    // and add year to label
    _.forEach(data.labels, function(value, key) {
        var i = key - startMonth;
        if (startMonth === 0 || key < startMonth) {
            yearLabel = currentYear.toString().substr(2,2);
        } else {
            yearLabel = lastYear.toString().substr(2,2);
        }
        if (i >= 0) {
            shiftedLabels[i] = value + '-' + yearLabel;
        } else {
            shiftedLabels[i + 12] = value + '-' + yearLabel;
        }
    });
    data.labels = shiftedLabels;

    return data;
}

function makeChartData(results) {
    var data = {},
        scores = [],
        validPercentByMonth = [null, null, null, null, null, null, null, null, null, null, null],
        monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var currentDate = new Date(),
        currentMonth = currentDate.getMonth(),
        currentYear = currentDate.getFullYear(),
        startTimestamp;

    // set the start timestamp to 12 months ago
    if (currentMonth != 11) {
        startTimestamp = new Date(currentYear - 1, currentMonth + 1, 1).getTime();
    } else {
        startTimestamp = new Date(currentYear, 0, 1).getTime();
    }
    // get all scores from 12 months ago until now
    _.forEach(results, function(obj) {
        var timestamp = new Date(obj.timestamp);
        if (timestamp.getTime() >= startTimestamp) {
            scores.push({score: parseInt(obj.score), month: timestamp.getMonth()});
        }
    });
    // group scores by month
    var scoresByMonth = _.groupBy(scores, 'month');
    // get valid percent by month
    _.forEach(scoresByMonth, function(value, key) {
        var validPercent = CalcUtils.validPercent(value);
        validPercentByMonth[key] = validPercent;
    });
    // set the start month to 12 months ago in data (index 0 of arrays) and make labels
    data = shiftToStartMonth({validPercent: validPercentByMonth, labels: monthLabels}, currentDate);

    return data;
}

function makeScoreLinePayload(results) {
    var chartData = makeChartData(results),
        validPercent = chartData.validPercent,
        monthLabels = chartData.labels;
    var invalidPercent = _.map(validPercent, function(n) {
        if (n == null) {
            return null;
        } else {
            return 100 - n;
        }
    });

    var data = {
        labels: monthLabels,
        datasets: [
            {
                label: "Valid %",
                fillColor: "rgba(122, 184, 0,0.2)",
                strokeColor: "rgba(122, 184, 0,1)",
                pointColor: "rgba(122, 184, 0,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(122, 184, 0,1)",
                data: validPercent
            },
            {
                label: "Invalid %",
                fillColor: "rgba(119,119,119,0.2)",
                strokeColor: "rgba(119,119,119,1)",
                pointColor: "rgba(119,119,119,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(119,119,119,1)",
                data: invalidPercent
            }
        ]
    };

    var options = {
        scaleShowGridLines : true,
        scaleGridLineColor : "rgba(0,0,0,.05)",
        scaleGridLineWidth : 1,
        scaleShowHorizontalLines: true,
        scaleShowVerticalLines: true,
        bezierCurve : true,
        bezierCurveTension : 0.4,
        pointDot : true,
        pointDotRadius : 4,
        pointDotStrokeWidth : 1,
        pointHitDetectionRadius : 20,
        datasetStroke : true,
        datasetStrokeWidth : 2,
        datasetFill : true
    };

    return {
        data: data,
        options: options
    };
}

module.exports = {
    makeOverviewNumber: makeOverviewNumber,
    makeOverview: makeOverview,
    makeTableHeader: makeTableHeader,
    makeTableBody: makeTableBody,
    filterTable: filterTable,
    makeScoreLinePayload: makeScoreLinePayload,
    searchIn: searchIn
};
