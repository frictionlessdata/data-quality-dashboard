var React = require('react');
var marked = require('marked');
var DefaultLayout = require('./default');

module.exports = React.createClass({
  safe: function(content) {
    return { __html: marked(content, {sanitize: true}) };
  },
  render: function() {
    return (
      <DefaultLayout instance={this.props.instance}>
        <div dangerouslySetInnerHTML={this.safe(this.props.content)} />
      </DefaultLayout>
    );
  }
});
