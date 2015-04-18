var React = require('react');
var Input = require('react-bootstrap/Input');
var UIUtils = require('../../utils/UIUtils');


var TableFilter = React.createClass({
    render: function() {
        return (
            <Input
                disabled
                type='text'
                placeholder='Filter by keywords'
                ref='input'
                onChange={UIUtils.filterTable()}
            />
        );
    }
});


module.exports = TableFilter;
