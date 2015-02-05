var React = require('react');


var TableResize = React.createClass({
    render: function() {
        return (
            <span className="pull-right">
                <a href="#"className="btn disabled">Show less</a> |
                <a href="#"className="btn disabled">Show more</a>
            </span>
        );
    }
});


module.exports = TableResize;
