var React = require('react');
var _ = require('lodash');
var Router = require('react-router-component');
var Link = Router.Link;
var CalcUtils = require('./CalcUtils.js');


function makeTableHeader(obj) {
    var _header = [];
    _.forEach(obj, function(value, key) {
        _header.push(<th key={key}>{key}</th>);
    });
    return _header;
}

function makeTableRow(obj, options) {
    var _row = [];
    _.forEach(obj, function(value, key) {
        var _cell;

        if (key === 'id') {

            _cell = <td key={key}><Link href={options.route + '/' + value}>{value}</Link></td>;

        } else if (key === 'url') {

            _cell = <td key={key}><a href={value}>Home Page</a></td>;

        } else if (key === 'score') {

            var _c;
            if (value <= 4) {
                _c = 'danger';
            } else if (value <= 8) {
                _c = 'warning';
            } else {
                _c = 'success';
            }
            _cell = <td key={key} className={_c}>{value}</td>;

        } else {

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
            color:"#F7464A",
            highlight: "#FF5A5E",
            label: "Invalid %"
        },
        {
            value: validPercent,
            color: "#46BFBD",
            highlight: "#5AD3D1",
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
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [35, 31, 29, 36, 46, 45, 51, 55, 61, 69, 58, 67]
                },
                {
                    label: "Invalid %",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
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
    makeTableHeader: makeTableHeader,
    makeTableRow: makeTableRow,
    filterTable: filterTable,
    makeScoreLinePayload: makeScoreLinePayload,
    makeScorePiePayload: makeScorePiePayload
};
