'use strict'

import { createEngine } from 'express-react-views'
import path from 'path'
import config from './config'
import _ from 'lodash'
import { middlewares, routes } from './backend'

export default function bootstrap(app, express) {
  let viewPath = path.join(__dirname, 'backend', 'views')
  let publicPath = path.join(path.dirname(__dirname), 'public')
  // NOTE: We compile ES6 at runtime, in server.js, hence transformViews is
  // false due to some weirdness in express-react-views
  // https://github.com/reactjs/express-react-views/issues/40
  let viewEngine = createEngine({transformViews: false})

  app.set('config', config)
  app.set('port', config.get('port'))
  app.set('views', viewPath)
  app.set('view engine', 'jsx')
  app.engine('jsx', viewEngine)
  app.use(express.static(publicPath))
  app.use([
    middlewares.getInstance,
    middlewares.getDB,
    middlewares.setLocals
  ])
  app.use('', routes())
  return app
}
