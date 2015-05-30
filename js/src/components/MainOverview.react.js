var React = require('react');
var UIUtils = require('../utils/UIUtils');


var MainOverview = React.createClass({
    render: function() {
        return (
            <div className="container">
                <h2>{this.props.dashboard}</h2>
                <p>How are government departments living up to their commitments to publish timely, high quality data on spending?</p>
                <ul className="overview">
                    {UIUtils.makeOverview(this.props.results, this.props.publishers, 'main')}
                </ul>
            </div>
        );
    }
});


module.exports = MainOverview;
