var React = require('react');
var Panel = require('react-bootstrap/Panel');
var CalcUtils = require('../utils/CalcUtils');


var SourceOverview = React.createClass({
    render: function() {
        return (
            <Panel>
                <ul>
                    <li>{CalcUtils.totalScore(this.props.results)} score</li>
                </ul>
            </Panel>
        );
    }
});


module.exports = SourceOverview;
