var React = require('react');
var _ = require('lodash');
var UIUtils = require('../../utils/UIUtils.js');
var Table = require('react-bootstrap/Table');
var TableFilter = require('./TableFilter.react');
var Button = require('react-bootstrap/Button');


var SourceTable = React.createClass({
    render: function() {
        return (
            <div className="container">
                <div className="intro">
                    <div className="text">
                        <h2>Data files</h2>
                    </div>
                </div>
                {/*<div>
                    <span className="pull-right"><TableFilter /></span>
                </div>*/}
                <Table className="table">
                    <thead>
                        <tr>
                            {UIUtils.makeTableHeader(this.props.sources[0], 'sources')}
                        </tr>
                    </thead>
                    <tbody>
                        {UIUtils.makeTableBody(this.props.sources, this.props.results, {'route': 'sources'})}
                    </tbody>
                </Table>
            </div>
        );
    }
});


module.exports = SourceTable;
