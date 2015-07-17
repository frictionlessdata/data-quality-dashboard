var React = require('react');
var _ = require('lodash');
var UIUtils = require('../../utils/UIUtils.js');
var Table = require('react-bootstrap/Table');
var TableFilter = require('./TableFilter.react');
var TableHead = require('./TableHead.react');

var SortableTable = React.createClass({
    getInitialState: function() {
	// Default sort order: true is ascending - false is descending
	return {sort: this.props.sort}

    },
    reSort: function(key) {
	var sortState = this.state.sort;
	// If key is first element in current sort state we reverse order
	if (_.first(sortState)[0] === key) {
	    _.first(sortState)[1] ^= true;
	}
        else {
            sortState = _.reject(sortState, function(item) {
		return item[0] === key
	    });
	    sortState.unshift([key, true]);
        }
	this.setState({sort: sortState});
    },
    render: function() {
	var columns = this.props.columns;
        var sortFunction = this.reSort;
        return (
            <div className="container">
                <div className="intro">
                    <div className="text">
                        <h2>{_.capitalize(this.props.title)}</h2>
                    </div>
                </div>
                {/*<div>
                    <span className="pull-right"><TableFilter /></span>
                </div>*/}
                <Table className="table">
                    <thead>
                        <tr>
                            {columns.map(function(column) {
                                return <TableHead key={column.key} column={column} sortFunction={sortFunction} />;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {UIUtils.makeTableBody(this.props.rows, this.props.results, {'route': this.props.title, 'sort': this.state.sort, 'columns':columns })}
                    </tbody>
                </Table>
            </div>
        );
    }
});


module.exports = SortableTable;
