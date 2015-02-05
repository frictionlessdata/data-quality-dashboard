var React = require('react');
var _ = require('lodash');
var UIUtils = require('../../utils/UIUtils.js');
var Col = require('react-bootstrap/Col');
var Table = require('react-bootstrap/Table');
var TableFilter = require('./TableFilter.react');
var TableInfo = require('./TableInfo.react');
var TableResize = require('./TableResize.react');


var SourceTable = React.createClass({
    render: function() {
        return (
                <div>
                <h2>
                Sources
                <span className="pull-right"><TableFilter /></span>
                </h2>

            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        {UIUtils.makeTableHeader(this.props.sources[0])}
                    </tr>
                </thead>
                <tbody>
                    {_.map(this.props.sources, function(obj) {
                        var _options = {'route': '/sources'};
                        return <tr key={obj.id}>{UIUtils.makeTableRow(obj, _options)}</tr>;
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


module.exports = SourceTable;
