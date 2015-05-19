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
                        <h2>Sources</h2>
                        <p>The dashboard monitors the following spend publication source files for this publisher. The source files are ordered by their score. The score for each source file is computed by subtracting the number of validation errors it causes from 10 (never going below 0). This is a result of the latest run (processing) of each of the spend publication source files.</p>
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
