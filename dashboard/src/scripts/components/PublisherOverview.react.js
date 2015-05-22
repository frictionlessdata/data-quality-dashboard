var React = require('react');
var UIUtils = require('../utils/UIUtils');


var PublisherOverview = React.createClass({
    render: function() {
        return (
            <div className="container">
                <h2>{this.props.publisher.title}</h2>
                <ul className="overview">
                    {UIUtils.makeOverview(this.props.results, 'publisher')}
                </ul>
            </div>
        );
    }
});


module.exports = PublisherOverview;
