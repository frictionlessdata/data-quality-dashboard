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

function makeOverview(results, objects, page) {
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
                value: CalcUtils.publisherCount(objects) + ''
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
                label: '% average score',
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
                label: '% average score',
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
    } else if (options.route === 'data files') {
        // for each source, get its score and timestamp from results and return a new array of sources with scores and timestamps
        _unsorted = _.map(objects, function(obj) {
            var _sourceData = CalcUtils.sourceScore(obj.id, results);
            var _objWithScore = _.cloneDeep(obj);
            _objWithScore.score = _sourceData.score;
            _objWithScore.timestamp = _sourceData.timestamp;
            // get period timestamp
            if (obj.period_id) {
                var period = obj.period_id.split('/');
                if (period.length === 1) {
                    var periodTimestamp = Date.parse(period[0]);
                } else if (period.length === 2) {
                    var periodTimestamp = Date.parse(period[1]);
                }
            } else {
                var periodTimestamp = 0;
            }
            _objWithScore.periodTimestamp = periodTimestamp;
            return _objWithScore;
        });
    }

    // sort
    var sorters = _.unzip(options.sort)
    _body = _.sortByOrder(_unsorted, sorters[0], sorters[1]);
    // for each data item, return a table row
    _body = _.map(_body, function(obj) {
        return <tr key={obj.id}>{makeTableRow(obj, options, options.route)}</tr>;
    });

    return _body;
}

function makeTableRow(obj, options, table) {
    var _row = [];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
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
                if (value <= 49) {
                    _c = 'danger';
                } else if (value <= 99) {
                    _c = 'warning';
                } else {
                    _c = 'success';
                }
                _cell = <td key={key} className={'score ' + _c}>{value + ' %'}</td>;

            } else if (key === 'type') {

                _cell = <td key={key}>{value.charAt(0).toUpperCase() + value.slice(1).replace('-', ' ')}</td>

            } else if (key == 'contact') {

                _cell = <td key={key}>{value}</td>;

            }
            _row.push(_cell);
        });
    } else if (table === 'data files') {
        _.forEach(obj, function(value, key) {
            var _cell;

            if (key === 'data') {

                _cell = <td key={key}><a href={value}><span className="glyphicon glyphicon-link" aria-hidden="true"></span></a></td>;

            } else if (key === 'score') {

                var _c;
                if (value <= 49) {
                    _c = 'danger';
                } else if (value <= 99) {
                    _c = 'warning';
                } else {
                    _c = 'success';
                }
                _cell = <td key={key} className={'score ' + _c}>{value + ' %'}</td>;

            } else if (key === 'title' || key === 'format') {

                _cell = <td key={key}>{value}</td>;

            } else if (key === 'period_id') {

                if (value) {
                    var period = value.split('/');
                    if (period.length === 1) {
                        var elements = period[0].split('-');
                        var month = months[elements[1] - 1];
                        var year = elements[0];
                        var displayed_period = month + ' ' + year;
                        _cell = <td key={key}>{displayed_period}</td>;
                    } else if (period.length === 2) {
                        var elements_start = period[0].split('-');
                        var elements_end = period[1].split('-');
                        var month_start = months[elements_start[1] - 1];
                        var month_end = months[elements_end[1] - 1];
                        var year_start = elements_start[0];
                        var year_end = elements_end[0];
                        var displayed_period = month_start + ' ' + year_start + ' to ' + month_end + ' ' + year_end;
                        _cell = <td key={key}>{displayed_period}</td>;
                    }
                } else {
                    _cell = <td key={key}>{}</td>;
                }

            } else if ( key === 'schema') {

                _cell = <td key="report"><a href={'http://goodtables.okfnlabs.org/reports?data_url=' + obj.data + '&format=' + obj.format + '&encoding=&schema_url=' + value}>{'What needs fixing'}</a></td>;

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
    makeTableBody: makeTableBody,
    filterTable: filterTable,
    makeScoreLinePayload: makeScoreLinePayload,
    searchIn: searchIn
};
