var React = require('react');
var _ = require('lodash');
var Col = require('react-bootstrap/Col');
var Navbar = require('react-bootstrap/Navbar');
var Nav = require('react-bootstrap/Nav');
var NavItem = require('react-bootstrap/NavItem');
var AutoCompleteInput = require('react-bootstrap-async-autocomplete');
var UIUtils = require('../../utils/UIUtils');


var Header = React.createClass({

    publisherSearch: function(key, callback) {
        var publishers = this.props.publishers;
        callback(UIUtils.searchIn(publishers, 'name', key));
    },

    publisherSearchSelected: function(selected) {
        alert('This will link to the view for: ' + selected);
    },

    render: function() {
        return (
            <Navbar fixedTop>
                <Nav>
                <NavItem eventKey={1} href="/">{this.props.instance.name}</NavItem>
                </Nav>
                <Nav className="pull-right">
                <AutoCompleteInput placeholder="Go to publisher ..." onSearch={this.publisherSearch} onItemSelect={this.publisherSearchSelected} />
                </Nav>
            </Navbar>
        );
    }
});


module.exports = Header;
