var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var APIUtils = require('./utils/APIUtils');
var MainPage = require('./components/pages/Main.react');
var PublisherPage = require('./components/pages/Publisher.react');
var SourcePage = require('./components/pages/Source.react');
var Header = require('./components/panels/Header.react');
var Footer = require('./components/panels/Footer.react');
var AppNode = document.getElementById('application');


// trigger our data fetches
APIUtils();


var App = React.createClass({
    render: function () {
        return (
            <RouteHandler />
        );
    }
});


var routes = (
    <Route handler={React.createFactory(App)}>
        <Route path='/' handler={React.createFactory(MainPage)} />
        <Route name='publishers' path='publishers/:lookup' handler={React.createFactory(PublisherPage)} />
        <Route name='sources' path='sources/:lookup' handler={React.createFactory(SourcePage)} />
    </Route>
);


Router.run(routes, function (Handler) {
    React.render(<Handler/>, AppNode);
});
