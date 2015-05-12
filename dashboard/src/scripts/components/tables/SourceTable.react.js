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
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus mauris molestie accumsan laoreet. Vestibulum elementum porta rhoncus. Vivamus sagittis urna congue sollicitudin mollis. Phasellus dictum elit sed posuere mattis. Donec egestas libero sit amet elit congue, quis placerat tellus pharetra.</p>
                    </div>
                    <div className="more">
                        <a className="btn btn-default" href="#" role="button">More</a>
                        <Button bsStyle="primary" className="download disabled">Download data</Button>
                    </div>
                </div>
                {/*<div>
                    <span className="pull-right"><TableFilter /></span>
                </div>*/}
                <Table className="table">
                    <thead>
                        <tr>
                            {UIUtils.makeTableHeader(this.props.sources[0])}
                        </tr>
                    </thead>
                    <tbody>
                        {_.map(this.props.sources, function(obj) {
                            var _options = {'route': 'sources'};
                            return <tr key={obj.id}>{UIUtils.makeTableRow(obj, _options)}</tr>;
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
});


module.exports = SourceTable;
