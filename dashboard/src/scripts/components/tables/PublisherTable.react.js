var React = require('react');
var _ = require('lodash');
var UIUtils = require('../../utils/UIUtils.js');
var Table = require('react-bootstrap/Table');
var TableFilter = require('./TableFilter.react');


var PublisherTable = React.createClass({
    render: function() {
        return (
            <div className="container">
                <div className="intro">
                    <div className="text">
                        <h2>Publishers</h2>
                    </div>
                </div>
                {/*<div>
                    <span className="pull-right"><TableFilter /></span>
                </div>*/}
                <Table className="table">
                    <thead>
                        <tr>
                            {UIUtils.makeTableHeader(this.props.publishers[0], 'publishers')}
                        </tr>
                    </thead>
                    <tbody>
                        {UIUtils.makeTableBody(this.props.publishers, this.props.results, {'route': 'publishers'})}
                    </tbody>
                </Table>
            </div>
        );
    }
});


module.exports = PublisherTable;