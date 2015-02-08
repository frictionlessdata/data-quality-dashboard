var React = require('react');
var Panel = require('react-bootstrap/Panel');
var Router = require('react-router');
var Link = Router.Link;
var CalcUtils = require('../utils/CalcUtils');


var SourceOverview = React.createClass({
    render: function() {
        return (
            <Panel>
                <ul>
                    <li>Score: {CalcUtils.totalScore(this.props.results)}</li>
                    <li>Revision: {this.props.source.revision}</li>
                    <li>Period: {}</li>
                    <li>Timestamp: {}</li>
                    <li>Publisher: <Link to="publishers" params={{lookup: this.props.source.publisher_id}}>{this.props.source.publisher_id}</Link></li>
                </ul>
            </Panel>
        );
    }
});


module.exports = SourceOverview;
