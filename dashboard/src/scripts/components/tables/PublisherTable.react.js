var React = require('react');
var _ = require('lodash');
var UIUtils = require('../../utils/UIUtils.js');
var Table = require('react-bootstrap/Table');
var Col = require('react-bootstrap/Col');
var TableFilter = require('./TableFilter.react');
var TableResize = require('./TableResize.react');
var TableInfo = require('./TableInfo.react');


var PublisherTable = React.createClass({
    render: function() {
        return (
            <div>
                <h2>
                    Publishers
                    <span className="pull-right"><TableFilter /></span>
                </h2>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            {UIUtils.makeTableHeader(this.props.publishers[0])}
                        </tr>
                    </thead>
                    <tbody>
                        {_.map(this.props.publishers, function(obj) {
                            var _options = {'route': 'publishers'};
                            return <tr key={obj.name}>{UIUtils.makeTableRow(obj, _options)}</tr>;
                        })}
                    </tbody>
                </Table>
                <Col>
                    <TableInfo />
                    <TableResize />
                </Col>
            </div>
        );
    }
});


module.exports = PublisherTable;
