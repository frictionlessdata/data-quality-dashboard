var React = require('react');
var UIUtils = require('../utils/UIUtils');


var MainOverview = React.createClass({
    render: function() {
        return (
            <div className="container">
                <ul className="overview">
                    {UIUtils.makeOverview(this.props.results, this.props.publishers, 'main')}
                </ul>
            </div>
        );
    }
});


module.exports = MainOverview;
