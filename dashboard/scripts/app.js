var React = require('react');
var Router = require('rrouter');
var Routes = Router.Routes;
var Route = Router.Route;

var MainPage = require('./components/pages/Main.react');
var PublisherPage = require('./components/pages/Publisher.react');
var SourcePage = require('./components/pages/Source.react.js');
var AppNode = document.getElementById('application');

var APIUtils = require('./utils/APIUtils');

APIUtils.getData();

var routes = (
    <Routes>
        <Route name="main" path="/" view={React.createFactory(MainPage)} />
        <Route name="publishers" path="/publishers/:route_id" view={React.createFactory(PublisherPage)} />
        <Route name="sources" path="/sources/:route_id" view={React.createFactory(SourcePage)} />
    </Routes>
)

Router.start(routes, function(view) {
    React.render(view, AppNode)
})
