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

function makeOverviewNumber(number) {
    var num = number + '',
        spans = [];
    _.forEach(num, function(c) {
        spans.push(<span>{c}</span>);
    });
    return spans;
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
    makeTableHeader: makeTableHeader,
    makeTableRow: makeTableRow,
    filterTable: filterTable,
    makeScoreLinePayload: makeScoreLinePayload,
    makeScorePiePayload: makeScorePiePayload,
    searchIn: searchIn
};
