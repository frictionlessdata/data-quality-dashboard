var React = require('react');


var TableHead = React.createClass({
    onClick: function(e) {
	this.props.sortFunction(this.props.column);
    },
    render: function() {
        return (
            <th onClick={this.onClick}>
                {_.capitalize(this.props.column)}
            </th>
        );
    }
});


module.exports = TableHead;
