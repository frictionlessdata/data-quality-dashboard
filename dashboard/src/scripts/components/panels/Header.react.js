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
                      <nav className="navbar  navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/">
                <span className="text">{this.props.instance.name}</span>
            </a>
          </div>
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav pull-right">
                <li>
                <div className="auto-complete-container"><AutoCompleteInput placeholder="Go to publisher ..." onSearch={this.publisherSearch} onItemSelect={this.publisherSearchSelected} /></div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
        );
    }
});


module.exports = Header;
