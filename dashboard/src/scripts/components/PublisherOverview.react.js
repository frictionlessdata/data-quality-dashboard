var React = require('react');
var CalcUtils = require('../utils/CalcUtils');
var UIUtils = require('../utils/UIUtils');


var PublisherOverview = React.createClass({
    render: function() {
        var publisherCount = UIUtils.makeOverviewNumber(CalcUtils.publisherCount(this.props.results)),
            sourceCount = UIUtils.makeOverviewNumber(CalcUtils.sourceCount(this.props.results)),
            validPercent = UIUtils.makeOverviewNumber(CalcUtils.validPercent(this.props.results)),
            timelyPercent = UIUtils.makeOverviewNumber(CalcUtils.timelyPercent(this.props.results));
        return (
            <div className="container">
                <ul className="overview">
                    <li className="counter"><span className="value">{publisherCount}</span> <span className="label">sub-publishers</span></li>
                    <li className="counter"><span className="value">{sourceCount}</span> <span className="label">sources</span></li>
                    <li className="counter"><span className="value">{validPercent}</span><span className="label">% valid</span></li>
                    <li className="counter"><span className="value">{timelyPercent}</span><span className="label">% timely</span></li>
                </ul>
            </div>
        );
    }
});


module.exports = PublisherOverview;
