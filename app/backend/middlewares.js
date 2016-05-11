'use strict'

import _ from 'lodash'
import services from './services'

function getInstance(req, res, next) {
  var cacheData = req.app.get('config').get('cacheData')
  services.getInstance()
  .then(function(result) {
    if (_.isEmpty(req.app.get('cache').get('instance')) || !cacheData) {
      // cache the instance
      req.app.get('cache').set('instance', result)
      return next()
    }
    if (req.app.get('cache').get('instance').last_modified != result.last_modified) {
      // flush cached data
      req.app.get('cache').flushAll();
      req.app.get('cache').set('instance', result)
      return next()
    }
    else{
      return next()
    }
  })
  .catch(console.trace.bind(console))
}

function getDB(req, res, next) {
  var cacheData = req.app.get('config').get('cacheData')
  if (_.isEmpty(req.app.get('cache').get('db')) || !cacheData) {
    services.makeDB()
      .then(function(result) {
        // cache the db
        req.app.get('cache').set('db', result)
        return next()
      })
      .catch(console.trace.bind(console))
  } else {
    return next()
  }
}


function setLocals(req, res, next) {
  res.locals.instance = req.app.get('cache').get('instance') || {}
  return next()
}

export default { getInstance, getDB, setLocals }
