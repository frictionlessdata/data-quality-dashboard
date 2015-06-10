var React = require('react');


var TableHead = React.createClass({
    onClick: function(e) {
	this.props.sortFunction(this.props.column.key);
    },
    render: function() {
        var tooltip = '';
        if (this.props.column.help) {
            tooltip = <span className="glyphicon glyphicon-question-sign" title={this.props.column.help}></span>;
        }
        return (
            <th onClick={this.onClick}>
                {_.capitalize(this.props.column.label || this.props.column.key)} {tooltip}
            </th>
        );
    }
});


module.exports = TableHead;
