var React = require('react');
var DefaultLayout = require('./default');

module.exports = React.createClass({
  render: function() {
    return (
      <DefaultLayout instance={this.props.instance}>
        <section id='application'></section>
      </DefaultLayout>
    );
  }
});
