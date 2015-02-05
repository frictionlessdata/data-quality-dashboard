var React = require('react');


var TableInfo = React.createClass({
    render: function() {
        return (
            <span className="pull-left">
                Showing X of X results
            </span>
        );
    }
});


module.exports = TableInfo;
