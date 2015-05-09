var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var CalcUtils = require('../utils/CalcUtils');
var UIUtils = require('../utils/UIUtils');


var SourceOverview = React.createClass({
    render: function() {
        var totalScore = UIUtils.makeOverviewNumber(CalcUtils.totalScore(this.props.results)),
            revision = UIUtils.makeOverviewNumber(this.props.source.revision);
        return (
            <div className="container">
                <ul className="overview">
                    <li className="counter"><span className="value">{totalScore}</span><span className="label">Score</span></li>
                    <li className="counter"><span className="value">{revision}</span><span className="label">Revision</span></li>
                    <li className="counter"><span className="value">{}</span><span className="label">Period</span></li>
                    <li className="counter"><span className="value">{}</span><span className="label">Timestamp</span></li>
                    <li className="counter"><span className="value"><Link to="publishers" params={{lookup: this.props.source.publisher_id}}>{this.props.source.publisher_id}</Link></span><span className="label">Publisher</span></li>
                </ul>
            </div>
        );
    }
});


module.exports = SourceOverview;
