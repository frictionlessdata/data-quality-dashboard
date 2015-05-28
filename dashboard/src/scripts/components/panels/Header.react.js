var React = require('react');
var _ = require('lodash');
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
            <div id="ok-panel" class="closed"><iframe src="//assets.okfn.org/themes/okfn/okf-panel.html" scrolling="no"></iframe></div>
            <nav className="navbar navbar-static-top">
              <div className="container">
                <div className="navbar-right">
                  <a className="ok-ribbon" href="https://okfn.org/"><img src="//okfnlabs.org/ok-panel/assets/images/ok-ribbon.png" alt="Open Knowledge"/></a>
                </div>
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
                </div>
                <div id="navbar" className="collapse navbar-collapse">
                  <ul className="nav navbar-nav">
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
