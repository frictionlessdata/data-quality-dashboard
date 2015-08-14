var React = require('react');
var Popover = require('react-bootstrap').Popover;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;


var TableHead = React.createClass({
    onClick: function(e) {
	this.props.sortFunction(this.props.column.key);
    },
    render: function() {
        var tooltip = '';
        if (this.props.column.help) {
            tooltip = (
		<OverlayTrigger trigger="click" placement="top" overlay={<Popover>{_.capitalize(this.props.column.help)}</Popover>}>
                    <span className="glyphicon glyphicon-question-sign"></span>
		</OverlayTrigger>
            );
        }
        return (
            <th>
                <span onClick={this.onClick}>{_.capitalize(this.props.column.label || this.props.column.key)}</span> {tooltip}
            </th>
        );
    }
});


module.exports = TableHead;
