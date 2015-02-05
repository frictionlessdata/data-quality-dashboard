var React = require('react');
var Router = require('react-router-component');
var Locations = React.createFactory(Router.Locations);
var Location = React.createFactory(Router.Location);
var MainPage = require('./components/pages/Main.react');
var PublisherPage = require('./components/pages/Publisher.react');
var SourcePage = require('./components/pages/Source.react.js');
var AppNode = document.getElementById('application');
var APIUtils = require('./utils/APIUtils');


var App = React.createClass({
    render: function () {
        return (
            <Locations>
                <Location path="/" handler={React.createFactory(MainPage)} />
                <Location path="/publishers/:lookup" handler={React.createFactory(PublisherPage)} />
                <Location path="/sources/:lookup" handler={React.createFactory(SourcePage)} />
            </Locations>
        );
    }
});


React.render(React.createElement(App), AppNode);
