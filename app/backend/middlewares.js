'use strict'

import _ from 'lodash'
import services from './services'

function getInstance(req, res, next) {
  var cacheData = req.app.get('config').get('cacheData')
  if (_.isEmpty(req.app.get('instance')) || !cacheData) {
    services.getInstance()
      .then(function(result) {
        // cache the instance data
        req.app.set('instance', result)
        return next()
      })
      .catch(console.trace.bind(console))
  } else {
    return next()
  }
}

function getDB(req, res, next) {
  var cacheData = req.app.get('config').get('cacheData')
  if (_.isEmpty(req.app.get('db')) || !cacheData) {
    services.makeDB()
      .then(function(result) {
        // cache the db
        req.app.set('db', result)
        return next()
      })
      .catch(console.trace.bind(console))
  } else {
    return next()
  }
}

function setLocals(req, res, next) {
  res.locals.instance = req.app.get('instance') || {}
  return next()
}

export default { getInstance, getDB, setLocals }
