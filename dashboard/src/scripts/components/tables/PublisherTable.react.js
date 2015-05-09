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
            <div className="container">
                <div className="intro">
                    <div className="text">
                        <h2>Publishers</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus mauris molestie accumsan laoreet. Vestibulum elementum porta rhoncus. Vivamus sagittis urna congue sollicitudin mollis. Phasellus dictum elit sed posuere mattis. Donec egestas libero sit amet elit congue, quis placerat tellus pharetra.</p>
                    </div>
                    <div className="more">
                        <a className="btn btn-default" href="#" role="button">More</a>
                    </div>
                </div>
                <div>
                    <span className="pull-right"><TableFilter /></span>
                </div>
                <Table className="table">
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
