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
          <div>
            <div className="collapse" id="okf-panel">
              <iframe src="//assets.okfn.org/themes/okfn/okf-panel.html" scrolling="no"></iframe>
            </div>
            <nav className="navbar navbar-static-top">
              <div className="container">
                <a href="http://okfn.org/" className="open-knowledge collapsed" title="An Open Knowledge Project" data-toggle="collapse" data-target="#okf-panel" onClick={this._onClick}><span className="text">An Open Knowledge Project</span></a>
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand has-icon" href="./">
                      <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                      <span className="text">{this.props.instance.name}</span>
                  </a>
                  <span className="alpha release badge">alpha</span>
                </div>
                <div id="navbar" className="collapse navbar-collapse">
                  <ul className="nav navbar-nav">
                    <li>
                      <div className="auto-complete-container"><AutoCompleteInput placeholder="Go to publisher ..." onSearch={this.publisherSearch} onItemSelect={this.publisherSearchSelected} /></div>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        );
    },

    _onClick: function(event) {
      if (document.body.clientWidth > 767) {
        event.preventDefault();
      }
    }
});


module.exports = Header;
