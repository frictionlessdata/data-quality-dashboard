'use strict';

module.exports = function bootstrap(app, express) {
  var path = require('path');
  var config = require('./config');
  var _ = require('lodash');
  var middlewares = require('./backend').middlewares;
  var routes = require('./backend').routes;
  var viewPath = path.join(__dirname, 'backend', 'views');
  var publicPath = path.join(path.dirname(__dirname), 'public');
  app.set('config', config);
  app.set('port', config.get('port'));
  app.set('views', viewPath);
  app.set('view engine', 'jsx');
  app.engine('jsx', require('express-react-views').createEngine());
  app.use(express.static(publicPath));
  app.use([
    middlewares.getInstance,
    middlewares.getDB,
    middlewares.setLocals
  ]);
  app.use('', routes());
  return app;
};
