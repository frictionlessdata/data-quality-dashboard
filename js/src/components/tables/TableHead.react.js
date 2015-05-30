var React = require('react');


var TableHead = React.createClass({
    onClick: function(e) {
	this.props.sortFunction(this.props.column.key);
    },
    render: function() {
        return (
            <th onClick={this.onClick}>
                {_.capitalize(this.props.column.label || this.props.column.key)}
            </th>
        );
    }
});


module.exports = TableHead;
