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

function makeOverview(results) {
    var documentWidth = document.body.clientWidth,
        availableWidth = 0,
        counters = [],
        digitMargins = 6,
        digitCount = 0,
        spacePerDigit, digitMaxWidth, digitWidth, counterPadding;

    var values = {
        publisherCount: {
            label: 'publishers',
            value: CalcUtils.publisherCount(results) + ''
        },
        sourceCount: {
            label: 'sources',
            value: CalcUtils.sourceCount(results) + ''
        },
        validPercent: {
            label: '% valid',
            value: CalcUtils.validPercent(results) + ''
        },
        timelyPercent: {
            label: '% timely',
            value: CalcUtils.timelyPercent(results) + ''
        }
    };

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

function makeTableHeader(obj) {
    var _header = [];
    _.forEach(obj, function(value, key) {
        switch(key) {
            case 'id':
                _header.push(<th key={key}>ID</th>);
            break;

            case 'name':
            case 'description':
            case 'contact':
            case 'revision':
            case 'timestamp':
                _header.push(<th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>);
            break;

            case 'url':
            case 'data':
                _header.push(<th key={key}></th>);
            break;

            case 'jurisdiction_code':
                _header.push(<th key={key}>Jurisdiction</th>);
            break;

            case 'publisher_id':
                _header.push(<th key={key}>Publisher ID</th>);
            break;

            case 'period_id':
                _header.push(<th key={key}>Period ID</th>);
            break;

            case 'score':
                _header.push(<th key={key} className="score">Score</th>);
            break;
        }
    });
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
        _body = _.sortBy(_.sortBy(_unsorted, 'name').reverse(), 'score').reverse();
        // for each publisher, return a table row
        _body = _.map(_body, function(obj) {
            return <tr key={obj.name}>{makeTableRow(obj, options)}</tr>;
        });
    } else if (options.route === 'sources') {
        // for each source, get its score from results and return a new array of sources with scores
        _unsorted = _.map(objects, function(obj) {
            var _sourceScore = CalcUtils.sourceScore(obj.id, results);
            var _objWithScore = _.cloneDeep(obj);
            _objWithScore.score = _sourceScore;
            return _objWithScore;
        });
        // sort sources by score in descending order and by name in ascending order
        _body = _.sortBy(_.sortBy(_unsorted, 'name').reverse(), 'score').reverse();
        // for each source, return a table row
        _body = _.map(_body, function(obj) {
            return <tr key={obj.id}>{makeTableRow(obj, options)}</tr>;
        });
    }
    return _body;
}

function makeTableRow(obj, options) {
    var _row = [];
    _.forEach(obj, function(value, key) {
        var _cell;

        if (key === 'id') {

            _cell = <td key={key}><Link to={options.route} params={{lookup: value}} className="label label-default">{value}</Link></td>;

        } else if (key === 'url' || key === 'data') {

            _cell = <td key={key}><a href={value}><span className="glyphicon glyphicon-link" aria-hidden="true"></span></a></td>;

        } else if (key === 'score') {

            var _c;
            if (value <= 4) {
                _c = 'danger';
            } else if (value <= 8) {
                _c = 'warning';
            } else {
                _c = 'success';
            }
            _cell = <td key={key} className={'score ' + _c}>{value}</td>;

        } else if (key === 'name' || key === 'description' || key == 'contact' || key === 'jurisdiction_code' || key === 'revision' || key === 'timestamp' || key === 'publisher_id' || key === 'period_id') {

            _cell = <td key={key}>{value}</td>;

        }
        _row.push(_cell);
    });
    return _row;
}

function filterTable() {
    //
}

function makeScorePiePayload(results) {
    var validPercent = CalcUtils.validPercent(results);
    var invalidPercent = 100 - validPercent;

    var data = [
        {
            value: invalidPercent,
            color: "rgba(119,119,119,0.3)",
            highlight: "rgba(119,119,119,0.2)",
            label: "Invalid %"
        },
        {
            value: validPercent,
            color: "rgba(122, 184, 0,0.3)",
            highlight: "rgba(122, 184, 0,0.2)",
           label: "Valid %"
        }
    ];

    var options = {
        segmentShowStroke : true,
        segmentStrokeColor : "#fff",
        segmentStrokeWidth : 2,
        percentageInnerCutout : 0,
        animationSteps : 100,
        animationEasing : "easeOutBounce",
        animateRotate : true,
        animateScale : false
    };

    return {
        data: data,
        options: options
    };
}

function makeScoreLinePayload(results) {

        var data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: "Valid %",
                    fillColor: "rgba(122, 184, 0,0.2)",
                    strokeColor: "rgba(122, 184, 0,1)",
                    pointColor: "rgba(122, 184, 0,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(122, 184, 0,1)",
                    data: [35, 31, 29, 36, 46, 45, 51, 55, 61, 69, 58, 67]
                },
                {
                    label: "Invalid %",
                    fillColor: "rgba(119,119,119,0.2)",
                    strokeColor: "rgba(119,119,119,1)",
                    pointColor: "rgba(119,119,119,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(119,119,119,1)",
                    data: [65, 69, 71, 64, 54, 55, 49, 45, 39, 31, 42, 33]
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
    makeScorePiePayload: makeScorePiePayload,
    searchIn: searchIn
};
