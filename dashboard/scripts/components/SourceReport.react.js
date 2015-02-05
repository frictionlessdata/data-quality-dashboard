var React = require('react');
var Table = require('react-bootstrap/Table');


var PublisherTable = React.createClass({
    render: function() {
        return (
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>HEADER</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>CELL</td>
                    </tr>
                </tbody>
            </Table>
        );
    }
});


module.exports = PublisherTable;
