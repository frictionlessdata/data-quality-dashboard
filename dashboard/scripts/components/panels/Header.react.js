var React = require('react');
var Col = require('react-bootstrap/Col');
var Navbar = require('react-bootstrap/Navbar');
var Nav = require('react-bootstrap/Nav');
var NavItem = require('react-bootstrap/NavItem');
var AutoCompleteInput = require('react-bootstrap-async-autocomplete');


var searchRequested = function(key, cb) {
    // this will list the results of the publisher search
    setTimeout(function() { //Emulate async
        var results = [];
        for (var i = 0; i < 10; i++) {
            results.push(key + i);
        }
        cb(results);
    }, 1000);
};


var itemSelected = function(itm) {
    // this will link to the publisher page
    alert(itm + ' selected');
};


var Header = React.createClass({
    render: function() {
        return (
            <Navbar fixedTop>
                <Nav>
                    <NavItem eventKey={1} href="/">{this.props.instance.name}</NavItem>
                </Nav>
                <Nav className="pull-right">
                    <AutoCompleteInput placeholder="Go to publisher ..." onSearch={searchRequested} onItemSelect={itemSelected} />
                </Nav>
            </Navbar>
        );
    }
});


module.exports = Header;
