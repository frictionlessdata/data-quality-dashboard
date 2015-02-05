var React = require('react');

var Navbar = require('react-bootstrap/Navbar');
var Nav = require('react-bootstrap/Nav');
var NavItem = require('react-bootstrap/NavItem');


var Footer = React.createClass({
    render: function() {
        return (
            <footer className="footer">
                <div className="container">
                    <p className="text-muted">
                        <a href="https://okfn.org/" title="Open Knowledge">An Open Knowledge Project</a>
                    </p>
                </div>
            </footer>
        );
    }
});


module.exports = Footer;
