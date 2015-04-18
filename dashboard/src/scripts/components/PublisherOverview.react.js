var React = require('react');
var Panel = require('react-bootstrap/Panel');
var CalcUtils = require('../utils/CalcUtils');


var PublisherOverview = React.createClass({
    render: function() {
        return (
            <Panel>
                <ul>
                    <li>{CalcUtils.publisherCount(this.props.results)} sub-publishers</li>
                    <li>{CalcUtils.sourceCount(this.props.results)} sources</li>
                    <li>{CalcUtils.validPercent(this.props.results)}% valid</li>
                    <li>{CalcUtils.timelyPercent(this.props.results)}% timely</li>
                    <li>{CalcUtils.totalScore(this.props.results)}total score</li>
                </ul>
            </Panel>
        );
    }
});


module.exports = PublisherOverview;
